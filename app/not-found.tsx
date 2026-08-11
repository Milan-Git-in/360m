import Link from "next/link";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-white">
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-3xl text-center px-6 py-28">
          <h1 className="text-8xl md:text-9xl font-extrabold tracking-tight">
            404
          </h1>
          <p className="mt-6 text-lg text-on-surface-variant">
            Oops — we couldn't find that page.
          </p>
          <p className="mt-2 text-sm text-on-surface-variant">
            The link may be broken or the page may have been removed.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-3 bg-white text-black rounded-full font-semibold shadow"
            >
              Go home
            </Link>

            <a
              href="https://wa.me/919638770089"
              className="px-6 py-3 bg-green-600 text-white rounded-full"
            >
              Contact us
            </a>
          </div>

          <div className="mt-10 text-sm text-on-surface-variant">
            If you believe this is an error, reach out and we'll help you find
            what you're looking for.
          </div>
        </div>
      </main>
      <footer className=" py-6 text-center font-bold text-xl">
        Group 360 | {new Date().getFullYear()}. All rights reserved.
      </footer>
    </div>
  );
}
