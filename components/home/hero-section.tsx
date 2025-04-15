import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkle } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="flex flex-col items-center justify-center">
        <div className="realative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white dark:bg-white/5 rounded-full group-hover:bg-gray-50  transition-colors duration-200"
          >
            <Sparkle className="h-8 w-8 mr-2 text-rose-600 dark:text-black animate-pulse" />
            <p className="text-base text-rose-600 dark:text-black">
              Powered by AI
            </p>
          </Badge>
        </div>
      </div>
      <h1 className="font-bold py-6 text-center">
        <span className="text-rose-500">Welcome to Summerease</span> Your
        AI-Powered PDF Summarizer!
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text_center px-4 lg:px-0 lg:max-w-4xl text-grey-600">
        Tired of reading lengthy PDFs? Let Summerease do the heavy lifting!
      </h2>
      <div>
        <Button
          variant={"link"}
          className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm-px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300"
        >
          <Link href="/#pricing" className="flex gap-2 items-center">
            <span>Explore SummerEase</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
