import { NextRequest, NextResponse } from "next/server";
import { dbExec, dbQuery, hasDbConfig } from "@/lib/db";
import { RowDataPacket } from "mysql2";

type EventRow = RowDataPacket & {
  id: number;
  event_name: string;
  source_page: string;
  metadata_json: string;
  created_at: string;
};

export async function GET() {
  if (!hasDbConfig()) {
    return NextResponse.json(
      { error: "DB config missing. Configure DB_* env vars for MySQL persistence." },
      { status: 503 }
    );
  }

  const rows = await dbQuery<EventRow[]>(
    `SELECT id, event_name, source_page, metadata_json, created_at
     FROM analytics_events
     ORDER BY id DESC
     LIMIT 200`
  );

  const events = rows
    .reverse()
    .map((row) => ({
      eventName: row.event_name,
      sourcePage: row.source_page,
      timestamp: new Date(row.created_at).toISOString(),
      metadata: (() => {
        try {
          return JSON.parse(row.metadata_json) as Record<string, string | number | boolean>;
        } catch {
          return {};
        }
      })()
    }));

  return NextResponse.json({ events });
}

export async function POST(request: NextRequest) {
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

  const eventName = String(body.eventName ?? "");
  const sourcePage = String(body.sourcePage ?? "");
  const metadata = typeof body.metadata === "object" && body.metadata ? body.metadata : {};
  const timestamp = body.timestamp ? new Date(String(body.timestamp)) : new Date();

  if (!eventName || !sourcePage) {
    return NextResponse.json({ error: "Missing required fields: eventName, sourcePage." }, { status: 400 });
  }

  await dbExec(
    `INSERT INTO analytics_events (event_name, source_page, metadata_json, created_at)
     VALUES (?, ?, ?, ?)`,
    [eventName, sourcePage, JSON.stringify(metadata), timestamp]
  );

  return NextResponse.json({ ok: true });
}
