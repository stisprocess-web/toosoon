"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#0A0A0A", color: "white", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1rem", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }} aria-hidden="true">💀</div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Total system meltdown.</h1>
          <p style={{ opacity: 0.6, marginBottom: "2rem", maxWidth: "28rem" }}>
            We&apos;ll be back. Probably.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ padding: "0.75rem 1.5rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.15)", fontWeight: 600, cursor: "pointer" }}
          >
            Reload
          </button>
          {error.digest ? <p style={{ opacity: 0.2, fontSize: "0.75rem", marginTop: "2rem" }}>Ref: {error.digest}</p> : null}
        </main>
      </body>
    </html>
  );
}
