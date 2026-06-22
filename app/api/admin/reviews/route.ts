import { NextResponse } from "next/server";
import { auth, isAdminEmail } from "@/lib/auth";
import { listReviews, setReviewStatus } from "@/lib/reviews";
import type { ReviewStatus } from "@/lib/db";

export const runtime = "nodejs";

const VALID_STATUSES: ReviewStatus[] = ["pending", "approved", "rejected"];

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) {
    return { error: NextResponse.json({ error: "Not signed in." }, { status: 401 }) };
  }
  if (!isAdminEmail(session.user.email)) {
    return { error: NextResponse.json({ error: "Not authorized." }, { status: 403 }) };
  }
  return { error: null };
}

export async function GET(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const url = new URL(request.url);
  const statusParam = url.searchParams.get("status") ?? "pending";
  const status =
    statusParam === "all" || (VALID_STATUSES as string[]).includes(statusParam)
      ? (statusParam as ReviewStatus | "all")
      : "pending";

  try {
    const reviews = await listReviews(status);
    return NextResponse.json({ reviews });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load reviews." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  let body: { id?: unknown; status?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  const status = typeof body.status === "string" ? body.status : "";
  if (!id) {
    return NextResponse.json({ error: "Missing review id." }, { status: 400 });
  }
  if (!(VALID_STATUSES as string[]).includes(status)) {
    return NextResponse.json(
      { error: "Status must be one of: pending, approved, rejected." },
      { status: 400 },
    );
  }

  try {
    const review = await setReviewStatus(id, status as ReviewStatus);
    if (!review) {
      return NextResponse.json({ error: "Review not found." }, { status: 404 });
    }
    return NextResponse.json({ review });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update review." },
      { status: 500 },
    );
  }
}
