export function imageBufferToBase64(buffer: Buffer, fileType: string) {
  return `data:image/${fileType};base64, ${buffer.toString("base64")}`;
}

export function getImageNameFromTsxPath(path: string) {
  return path
    .split("/")
    .at(-1)
    ?.replace(/\.tsx$/, "")
    .replace(/^_/, "");
}
