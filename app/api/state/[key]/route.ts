import { NextRequest, NextResponse } from "next/server";
import { hasDbConfig } from "@/lib/db";
import { getState, setState } from "@/lib/server-state";

const ALLOWED_KEYS = new Set(["settings", "landing-overrides", "blog-posts", "page-meta"]);

type Params = {
  params: { key: string };
};

export async function GET(_: NextRequest, { params }: Params) {
  if (!ALLOWED_KEYS.has(params.key)) {
    return NextResponse.json({ error: "Invalid state key." }, { status: 400 });
  }

  if (!hasDbConfig()) {
    return NextResponse.json(
      { error: "DB config missing. Configure DB_* env vars for MySQL persistence." },
      { status: 503 }
    );
  }

  const value = await getState(params.key, null);
  return NextResponse.json({ value });
}

export async function PUT(request: NextRequest, { params }: Params) {
  if (!ALLOWED_KEYS.has(params.key)) {
    return NextResponse.json({ error: "Invalid state key." }, { status: 400 });
  }

  if (!hasDbConfig()) {
    return NextResponse.json(
      { error: "DB config missing. Configure DB_* env vars for MySQL persistence." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !("value" in body)) {
    return NextResponse.json({ error: "Body must include `value`." }, { status: 400 });
  }

  await setState(params.key, body.value);
  return NextResponse.json({ ok: true });
}
