import { NextRequest, NextResponse } from "next/server";
import { dbExec, hasDbConfig } from "@/lib/db";

type Params = {
  params: { id: string };
};

export async function PATCH(request: NextRequest, { params }: Params) {
  if (!hasDbConfig()) {
    return NextResponse.json(
      { error: "DB config missing. Configure DB_* env vars for MySQL persistence." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const status = body.status ? String(body.status) : null;
  const notes = body.notes !== undefined ? String(body.notes) : null;

  if (!status && notes === null) {
    return NextResponse.json({ error: "Provide `status` and/or `notes`." }, { status: 400 });
  }

  if (status && !["new", "in_progress", "closed"].includes(status)) {
    return NextResponse.json({ error: "Invalid lead status." }, { status: 400 });
  }

  if (status && notes !== null) {
    await dbExec("UPDATE leads SET status = ?, notes = ? WHERE id = ?", [status, notes, params.id]);
  } else if (status) {
    await dbExec("UPDATE leads SET status = ? WHERE id = ?", [status, params.id]);
  } else if (notes !== null) {
    await dbExec("UPDATE leads SET notes = ? WHERE id = ?", [notes, params.id]);
  }

  return NextResponse.json({ ok: true });
}
