"use client";
import UploadFormInput from "@/components/upload/upload-form-input";
import { useUploadThing } from "@/lib/uploadthing";
import toast, { useToaster } from "react-hot-toast";
import { z } from "zod";
const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});
export default function UploadForm() {
  const toaster = useToaster();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading,", err);
      toast.error(
        <div>
          <p className="font-semibold">Upload failed</p>
          <p className="text-sm text-gray-400">
            Something went wrong while uploading
          </p>
        </div>
      );
    },
    onUploadBegin: (file: string) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    //Validating the file
    const isValid = schema.safeParse({ file });
    if (!isValid.success) {
      toast.error(
        <div>
          <p className="font-semibold">❌Upload failed</p>
          <p className="text-sm text-gray-400">
            {isValid.error.flatten().fieldErrors?.file?.[0] ?? "Invalid file"}
          </p>
        </div>
      );
      return;
    }

    const resp = await toast.promise(startUpload([file]), {
      loading: "Uploading...",
      success: "Uploaded successfully!",
      error: "Upload failed",
    });

    if (!resp) {
      console.log("Upload failed");
      return;
    }
    //summerize the pdf using AI
    //store the summary in the database
    //redirect the user to the summary page
    //show the summary to the user
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
