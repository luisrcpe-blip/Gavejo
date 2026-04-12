import { dbExec, dbQuery } from "@/lib/db";
import { RowDataPacket } from "mysql2";

type StateRow = RowDataPacket & {
  state_key: string;
  state_json: string;
};

export async function getState<T>(key: string, fallback: T): Promise<T> {
  const rows = await dbQuery<StateRow[]>(
    "SELECT state_key, state_json FROM app_state WHERE state_key = ? LIMIT 1",
    [key]
  );
  if (!rows.length) return fallback;
  try {
    return JSON.parse(rows[0].state_json) as T;
  } catch {
    return fallback;
  }
}

export async function setState<T>(key: string, value: T) {
  const payload = JSON.stringify(value);
  await dbExec(
    `INSERT INTO app_state (state_key, state_json)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE state_json = VALUES(state_json), updated_at = CURRENT_TIMESTAMP`,
    [key, payload]
  );
}
