import { NextResponse } from "next/server";
import {
  isStudioConfigured,
  passwordMatches,
  createSessionToken,
  STUDIO_COOKIE,
  STUDIO_COOKIE_MAX_AGE,
} from "@/lib/studioAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isStudioConfigured()) {
    return NextResponse.json(
      { error: "Photo studio isn't configured yet. Ask your developer to set STUDIO_PASSWORD." },
      { status: 503 },
    );
  }

  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "That password didn't match." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(STUDIO_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: STUDIO_COOKIE_MAX_AGE,
  });
  return res;
}
