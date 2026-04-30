import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-4" aria-hidden="true">🤷</div>
      <h1 className="font-display text-5xl sm:text-6xl font-bold mb-3">
        <span className="gradient-text">404</span>
      </h1>
      <p className="text-white/50 mb-8 max-w-md">
        That page doesn&apos;t exist. Too soon to give up — try the homepage.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-toosoon-red/20 border border-toosoon-red/40 text-toosoon-red font-semibold hover:bg-toosoon-red/30 transition"
      >
        Take me home
      </Link>
    </main>
  );
}
