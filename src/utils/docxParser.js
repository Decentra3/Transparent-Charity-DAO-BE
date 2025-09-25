// utils/docxParser.js
import mammoth from "mammoth";

export async function convertDocxToText(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value; // text thuần
  } catch (err) {
    console.error("Failed to parse DOCX:", err);
    return "";
  }
}
