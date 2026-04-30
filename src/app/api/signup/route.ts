import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let payload: { email?: unknown; source?: unknown };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const source = typeof payload.source === "string" ? payload.source.slice(0, 80) : "landing";

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = getServerSupabase();
  } catch (err) {
    console.error("[signup] supabase not configured", err);
    return NextResponse.json(
      { error: "Signup is temporarily offline. Try again in a minute." },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;
  const referrer = req.headers.get("referer")?.slice(0, 500) ?? null;

  const { error } = await supabase.from("waitlist").insert({
    email,
    source,
    ip,
    user_agent: userAgent,
    referrer,
  });

  if (error) {
    // Unique violation = already signed up. Still a success from the user's POV.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, alreadySignedUp: true });
    }
    console.error("[signup] insert failed", error);
    return NextResponse.json({ error: "Could not save your spot. Try again." }, { status: 500 });
  }

  // Best-effort waitlist count for the success message.
  let position: number | null = null;
  const { data: countRow } = await supabase.from("waitlist_count").select("total").single();
  if (countRow && typeof countRow.total === "number") position = countRow.total;

  return NextResponse.json({ ok: true, position });
}

export async function GET() {
  // Public count for the homepage counter. Falls back to null if Supabase is
  // unreachable so the page can render without a fake number.
  try {
    const supabase = getServerSupabase();
    const { data, error } = await supabase.from("waitlist_count").select("total").single();
    if (error || !data) return NextResponse.json({ total: null });
    return NextResponse.json({ total: data.total });
  } catch {
    return NextResponse.json({ total: null });
  }
}
