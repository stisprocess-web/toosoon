"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-4" aria-hidden="true">💀</div>
      <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">
        That broke. Too soon?
      </h1>
      <p className="text-white/50 max-w-md mb-8">
        Something went wrong on our end. We&apos;re looking at it.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 font-semibold hover:bg-white/15 transition"
        >
          Try again
        </button>
        <a
          href="/"
          className="px-6 py-3 rounded-xl bg-toosoon-red/20 border border-toosoon-red/40 text-toosoon-red font-semibold hover:bg-toosoon-red/30 transition"
        >
          Back to start
        </a>
      </div>
      {error.digest ? (
        <p className="text-white/20 text-xs mt-8">Ref: {error.digest}</p>
      ) : null}
    </main>
  );
}
