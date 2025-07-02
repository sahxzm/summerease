declare module 'pdf-parse' {
  export default function parsePdf(buffer: Buffer): Promise<{
    text: string;
    numpages: number;
    info: {
      PDFFormatVersion: string;
      filesize: number;
      [key: string]: any;
    };
    metadata: {
      [key: string]: any;
    };
  }>;
}
