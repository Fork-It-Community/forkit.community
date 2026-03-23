import { statSync } from "node:fs";
import { basename } from "node:path";

const MAX_SIZE_KB = 500;
const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;

const files = process.argv.slice(2);
const errors: string[] = [];

for (const file of files) {
  const stats = statSync(file);
  if (stats.size > MAX_SIZE_BYTES) {
    const sizeKB = Math.round(stats.size / 1024);
    errors.push(`  ${basename(file)} (${sizeKB} KB > ${MAX_SIZE_KB} KB)`);
  }
}

if (errors.length > 0) {
  console.error(
    `\n❌ The following images exceed the maximum size of ${MAX_SIZE_KB} KB:\n`,
  );
  for (const error of errors) {
    console.error(error);
  }
  console.error(
    "\nPlease compress or resize these images before committing.\n" +
      "You can use tools like https://squoosh.app",
  );
  process.exit(1);
}
