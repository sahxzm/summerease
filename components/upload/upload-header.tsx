import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative p-[1px] rounded-full bg-linear-to-r from-rose-200 dark:from-rose-400 via-rose-500 to-rose-800 animate-gradient-x group">
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium bg-white dark:bg-white/5 rounded-full group-hover:bg-gray-50 transition-colors"
        >
          <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
          <p className="text-base dark:text-black">
            AI-Powered Content Creation
          </p>
        </Badge>
      </div>
      <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Start Uploading{" "}
        <span className="relative inline-block">
          <span className="realtive z-10 px-2 text-black dark:text-white">
            Your PDF's
          </span>
          <span
            className="absolute inset-0
     bg-rose-200/50 -rotate-2 rounded-lg transfrom -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>{" "}
      </div>
      <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
        <p className="text-black dark:text-white">
          Upload your PDF and let out AI do the rest of the work. Relax and
          Chill.
        </p>
      </div>
    </div>
  );
}
