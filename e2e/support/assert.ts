import type { APIRequestContext } from "@playwright/test";
import { pageTitle, visibleText } from "./html";

/**
 * Enough parallelism to keep a few dozen URLs quick, low enough not to look
 * like a small denial of service to a cold preview deployment.
 */
const CONCURRENCY = 10;

export const mapWithConcurrency = async <T, R>(
  items: readonly T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> => {
  const results: R[] = new Array<R>(items.length);
  let cursor = 0;

  const worker = async (): Promise<void> => {
    for (;;) {
      const index = cursor++;
      const item = items[index];
      if (index >= items.length || item === undefined) return;
      results[index] = await fn(item);
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker),
  );
  return results;
};

export type PageCheck = {
  path: string;
  status: number;
  title: string | null;
  textLength: number;
};

/**
 * Measured, not guessed: on this site the thinnest real page renders ~460
 * characters of text while a meta-refresh redirect stub renders ~65. A floor
 * of 250 separates the two with room on both sides, and catches the failure
 * that matters — a page that responds 200 but rendered nothing.
 *
 * Deliberately not an <h1> check: several real pages (event sponsors, for
 * one) have no <h1> at all, so that rule reported healthy pages as broken.
 */
const MIN_TEXT_LENGTH = 250;

export const checkPages = (
  request: APIRequestContext,
  paths: readonly string[],
): Promise<PageCheck[]> =>
  mapWithConcurrency(paths, CONCURRENCY, async (path) => {
    const response = await request.get(path);
    const status = response.status();
    if (status !== 200) return { path, status, title: null, textLength: 0 };

    const html = await response.text();
    return {
      path,
      status,
      title: pageTitle(html),
      textLength: visibleText(html).length,
    };
  });

/**
 * Returns a human-readable list of what went wrong, so a spec can assert
 * `toEqual([])` once and get every broken URL in a single diff rather than
 * failing on the first one and hiding the rest.
 */
export const renderProblems = (checks: readonly PageCheck[]): string[] =>
  checks.flatMap((check) => {
    if (check.status !== 200) return [`${check.path} → HTTP ${check.status}`];
    if (!check.title) return [`${check.path} → no <title>`];
    if (check.textLength < MIN_TEXT_LENGTH) {
      return [
        `${check.path} → rendered only ${check.textLength} characters of text`,
      ];
    }
    return [];
  });

/** For endpoints where only the status matters. */
export const statusProblems = (checks: readonly PageCheck[]): string[] =>
  checks.flatMap((check) =>
    check.status === 200 ? [] : [`${check.path} → HTTP ${check.status}`],
  );

export type BinaryCheck = {
  path: string;
  status: number;
  contentType: string;
  bytes: number;
};

export const checkBinaries = (
  request: APIRequestContext,
  paths: readonly string[],
): Promise<BinaryCheck[]> =>
  mapWithConcurrency(paths, CONCURRENCY, async (path) => {
    const response = await request.get(path);
    const body = await response.body();
    return {
      path,
      status: response.status(),
      contentType: response.headers()["content-type"] ?? "",
      bytes: body.length,
    };
  });

/**
 * Satori's realistic failure modes are throwing outright — a bumped
 * dependency, a font it can no longer load, CSS it no longer supports — or
 * emitting a near-empty image. Status, content type and a size floor catch
 * both without decoding anything, which keeps this out of visual-regression
 * territory.
 */
export const binaryProblems = (
  checks: readonly BinaryCheck[],
  expectedType: RegExp,
  minBytes: number,
): string[] =>
  checks.flatMap((check) => {
    if (check.status !== 200) return [`${check.path} → HTTP ${check.status}`];
    if (!expectedType.test(check.contentType)) {
      return [`${check.path} → content-type ${check.contentType}`];
    }
    if (check.bytes < minBytes) {
      return [`${check.path} → only ${check.bytes} bytes`];
    }
    return [];
  });
