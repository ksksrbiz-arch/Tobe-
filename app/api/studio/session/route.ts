import { NextResponse } from "next/server";
import { isStudioAuthed, isStudioConfigured } from "@/lib/studioAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    authed: await isStudioAuthed(),
    configured: isStudioConfigured(),
  });
}
