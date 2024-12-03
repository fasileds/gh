import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-gray-50">
      {/* Header with Logo */}
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-green-500 p-4 md:h-52 shadow-xl">
        <AcmeLogo />
      </div>

      {/* Main Content Area */}
      <div className="mt-6 flex grow flex-col gap-6 md:flex-row">
        {/* Left Column with Welcome Message */}
        <div className="flex flex-col justify-center gap-8 rounded-lg bg-white shadow-lg p-8 md:w-2/5 md:px-10">
          <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-green-500 mb-4" />
          <p
            className={`${lusitana.className} text-xl text-gray-900 md:text-3xl md:leading-relaxed`}
          >
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a
              href="https://nextjs.org/learn/"
              className="text-green-500 hover:underline"
            >
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/pages/login"
            className="flex items-center gap-3 self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition duration-300 hover:bg-green-400 md:text-base"
          >
            <span>Log in</span>
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>

        {/* Right Column with Hero Image */}
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-20 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block rounded-lg shadow-md"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
    </main>
  );
}
