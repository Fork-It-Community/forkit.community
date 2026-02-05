import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const sourceDir = path.join(projectRoot, "node_modules/orejime/dist");
const targetDir = path.join(projectRoot, "public/orejime");

// Create target directory
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy necessary files (English only)
const filesToCopy = ["orejime-standard-en.js", "orejime-standard.css"];

filesToCopy.forEach((file) => {
  const source = path.join(sourceDir, file);
  const target = path.join(targetDir, file);

  if (!fs.existsSync(source)) {
    console.error(`Warning: Source file not found: ${source}`);
    return;
  }

  fs.copyFileSync(source, target);
  console.log(`Copied ${file}`);
});

console.log("Orejime assets copied successfully!");
