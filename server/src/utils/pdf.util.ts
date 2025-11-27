import { PDFParse } from "pdf-parse";

export const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
  try {
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    await parser.destroy();
    return data.text;
  } catch (error) {
    throw new Error("Failed to parse PDF. File may be corrupted or invalid.");
  }
};
