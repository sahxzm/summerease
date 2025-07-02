declare module 'pdfjs-dist/legacy/build/pdf.js' {
  export interface PDFTextItem {
    str: string;
  }

  export interface PDFPage {
    getTextContent(): Promise<{ items: PDFTextItem[] }>;
  }

  export interface PDFDocument {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPage>;
  }

  export function getDocument(data: ArrayBuffer): {
    promise: Promise<PDFDocument>;
  };

  export namespace GlobalWorkerOptions {
    export function setWorkerSrc(src: string): void;
  }
}
