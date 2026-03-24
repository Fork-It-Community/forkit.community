import { statSync } from "node:fs";

const DEFAULT_MAX_KB = 500;

const SIZE_LIMITS: { pattern: string; maxKB: number }[] = [
  { pattern: "src/content/people/", maxKB: 500 },
  { pattern: "src/content/partners/", maxKB: 500 },
  { pattern: "src/content/news/", maxKB: 1000 },
  { pattern: "src/content/podcasts/", maxKB: 1000 },
  { pattern: "src/content/events/", maxKB: 2000 },
  { pattern: "src/content/for-kids-events/", maxKB: 1000 },
  { pattern: "src/content/for-kids-workshops/", maxKB: 1000 },
  { pattern: "src/assets/images/", maxKB: 1000 },
];

function getMaxKB(filePath: string): number {
  const match = SIZE_LIMITS.find((limit) => filePath.includes(limit.pattern));
  return match?.maxKB ?? DEFAULT_MAX_KB;
}

const files = process.argv.slice(2);
const errors: string[] = [];

for (const file of files) {
  const maxKB = getMaxKB(file);
  const stats = statSync(file);
  const sizeKB = Math.round(stats.size / 1024);
  if (stats.size > maxKB * 1024) {
    errors.push(`  ${file} (${sizeKB} KB > ${maxKB} KB)`);
  }
}

if (errors.length > 0) {
  console.error(`\n❌ The following images exceed their size limit:\n`);
  for (const error of errors) {
    console.error(error);
  }
  console.error(
    "\nSize limits:" +
      `\n  People, partners:                500 KB` +
      `\n  News, podcasts, hero:   1000 KB` +
      `\n  Events:                         2000 KB` +
      `\n  Other images:                    ${DEFAULT_MAX_KB} KB` +
      "\n\nPlease compress or resize these images before committing." +
      "\nYou can use tools like https://squoosh.app\n",
  );
  process.exit(1);
}
