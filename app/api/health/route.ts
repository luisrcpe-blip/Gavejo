import { NextResponse } from "next/server";
import { hasDbConfig, pingDb } from "@/lib/db";

export async function GET() {
  const dbConfigured = hasDbConfig();
  const dbConnected = dbConfigured ? await pingDb() : false;

  return NextResponse.json({
    ok: true,
    service: "gavejo-demo-v3",
    timestamp: new Date().toISOString(),
    db: {
      configured: dbConfigured,
      connected: dbConnected
    }
  });
}
