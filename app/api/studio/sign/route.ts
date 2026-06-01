import { NextResponse } from "next/server";
import { isStudioAuthed } from "@/lib/studioAuth";
import { signUpload } from "@/lib/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  if (!(await isStudioAuthed())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const signature = signUpload();
  if (!signature) {
    return NextResponse.json(
      { error: "Cloudinary isn't configured (missing CLOUDINARY_URL)." },
      { status: 503 },
    );
  }
  return NextResponse.json(signature);
}
