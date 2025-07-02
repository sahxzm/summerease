"use client";
import { generatePdfSummary } from "@/actions/upload-actions";
import FloatingBubble from "@/components/common/floating-bubble";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";

export function UploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pdfData, setPdfData] = useState<{ originalText: string | null; summary: string | null }>({ originalText: null, summary: null });
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { startUpload } = useUploadThing("pdfUploader");

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) {
      setError("Please select a file to upload");
      return;
    }

    const file = files[0];
    if (file.size > 32 * 1024 * 1024) {
      setError("File size exceeds 32MB limit");
      return;
    }

    setIsUploading(true);
    setError(null);
    setMessage("Uploading PDF...");

    try {
      // Add progress tracking manually since UploadThing doesn't support it directly
      const progressInterval = setInterval(() => {
        if (uploadProgress < 1) {
          setUploadProgress(prev => Math.min(prev + 0.1, 1));
          setMessage(`Uploading... ${Math.round(uploadProgress * 100)}%`);
        }
      }, 1000);

      try {
        // Wait for a short time to simulate upload progress
        await new Promise(resolve => setTimeout(resolve, 3000));

        const uploadResponse = await startUpload(files);
        if (!uploadResponse) {
          throw new Error("Upload failed");
        }

        setPdfData({ originalText: null, summary: null });
        setError(null);
        setIsProcessing(true);
        setMessage("Processing PDF...");

        const result = await generatePdfSummary(uploadResponse);

        if (result.success && result.data) {
          setPdfData({
            originalText: result.data.originalText,
            summary: result.data.summary
          });
          setMessage("PDF processed and summarized successfully!");
        } else {
          setError(result.message || "Failed to process PDF");
        }
      } catch (error) {
        console.error("Error processing PDF:", error);
        setError(error instanceof Error ? error.message : "Failed to process PDF");
      } finally {
        clearInterval(progressInterval);
        setIsProcessing(false);
        setIsUploading(false);
        setUploadProgress(0);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during upload");
      setIsUploading(false);
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <label
          htmlFor="pdf-upload"
          className="cursor-pointer block text-sm font-medium text-gray-700"
        >
          <div className="space-y-2">
            <div className="flex flex-col items-center justify-center space-y-1">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="flex flex-col items-center space-y-1">
                <span className="text-sm text-gray-600">
                  Drag and drop your PDF here, or click to select
                </span>
                <span className="text-xs text-gray-500">
                  PDF files up to 32MB
                </span>
              </div>
            </div>
          </div>
        </label>
        <input
          id="pdf-upload"
          name="pdf-upload"
          type="file"
          accept=".pdf"
          className="sr-only"
          onChange={(e) => handleUpload(e.target.files ? Array.from(e.target.files) : [])}
          disabled={isUploading || isProcessing}
        />
      </div>

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <FloatingBubble text={pdfData.summary} />

      {uploadProgress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}