import { NextRequest, NextResponse } from "next/server";
import { dbExec, dbQuery, hasDbConfig } from "@/lib/db";
import { RowDataPacket } from "mysql2";

type LeadRow = RowDataPacket & {
  id: string;
  name: string;
  contact: string;
  message: string;
  origin_landing: string;
  status: "new" | "in_progress" | "closed";
  notes: string;
  created_at: string;
  consent: number;
  utm_source: string | null;
  utm_campaign: string | null;
};

export async function GET() {
  if (!hasDbConfig()) {
    return NextResponse.json(
      { error: "DB config missing. Configure DB_* env vars for MySQL persistence." },
      { status: 503 }
    );
  }

  const rows = await dbQuery<LeadRow[]>(
    `SELECT id, name, contact, message, origin_landing, status, notes, created_at, consent, utm_source, utm_campaign
     FROM leads
     ORDER BY created_at DESC`
  );

  const leads = rows.map((row) => ({
    id: row.id,
    name: row.name,
    contact: row.contact,
    message: row.message,
    originLanding: row.origin_landing,
    status: row.status,
    notes: row.notes ?? "",
    createdAt: new Date(row.created_at).toISOString(),
    consent: Boolean(row.consent),
    utmSource: row.utm_source ?? undefined,
    utmCampaign: row.utm_campaign ?? undefined
  }));

  return NextResponse.json({ leads });
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

  const id = String(body.id ?? "");
  const name = String(body.name ?? "");
  const contact = String(body.contact ?? "");
  const message = String(body.message ?? "");
  const originLanding = String(body.originLanding ?? "");
  const status = String(body.status ?? "new");
  const notes = String(body.notes ?? "");
  const createdAt = String(body.createdAt ?? new Date().toISOString());
  const consent = Boolean(body.consent);
  const utmSource = body.utmSource ? String(body.utmSource) : null;
  const utmCampaign = body.utmCampaign ? String(body.utmCampaign) : null;

  if (!id || !name || !contact || !message || !originLanding) {
    return NextResponse.json(
      { error: "Missing required lead fields: id, name, contact, message, originLanding." },
      { status: 400 }
    );
  }

  if (!["new", "in_progress", "closed"].includes(status)) {
    return NextResponse.json({ error: "Invalid lead status." }, { status: 400 });
  }

  await dbExec(
    `INSERT INTO leads (
      id, name, contact, message, origin_landing, status, notes, created_at, consent, utm_source, utm_campaign
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      contact = VALUES(contact),
      message = VALUES(message),
      origin_landing = VALUES(origin_landing),
      status = VALUES(status),
      notes = VALUES(notes),
      consent = VALUES(consent),
      utm_source = VALUES(utm_source),
      utm_campaign = VALUES(utm_campaign)`,
    [
      id,
      name,
      contact,
      message,
      originLanding,
      status,
      notes,
      new Date(createdAt),
      consent ? 1 : 0,
      utmSource,
      utmCampaign
    ]
  );

  return NextResponse.json({ ok: true });
}
