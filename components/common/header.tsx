import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FileText } from "lucide-react";
import NavLink from "./nav-link";

export default function Header() {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-4 h-4 lg:h-5 lg:w-5 text-red-600 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="text-xl lg:text-xl font-extrabold">SummerEase</span>
        </NavLink>
      </div>

      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">My Summer-Ease(summery)</NavLink>
        </SignedIn>
      </div>

      <div className="flex justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div>ProMember</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>

        <SignedOut>
          <NavLink href="/sign-in">SignIn</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
}
