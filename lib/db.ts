import mysql, { Pool, RowDataPacket } from "mysql2/promise";

let pool: Pool | null = null;

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export function hasDbConfig() {
  return Boolean(
    process.env.DB_HOST &&
      process.env.DB_PORT &&
      process.env.DB_USER &&
      process.env.DB_PASSWORD &&
      process.env.DB_NAME
  );
}

function getPool() {
  if (pool) return pool;

  const sslEnabled = process.env.DB_SSL === "true";

  pool = mysql.createPool({
    host: getRequiredEnv("DB_HOST"),
    port: Number(getRequiredEnv("DB_PORT")),
    user: getRequiredEnv("DB_USER"),
    password: getRequiredEnv("DB_PASSWORD"),
    database: getRequiredEnv("DB_NAME"),
    connectionLimit: 10,
    charset: "utf8mb4",
    ssl: sslEnabled ? { rejectUnauthorized: false } : undefined
  });

  return pool;
}

export async function dbQuery<T extends RowDataPacket[]>(sql: string, params: unknown[] = []) {
  const activePool = getPool();
  const [rows] = await activePool.query<T>(sql, params);
  return rows;
}

export async function dbExec(sql: string, params: unknown[] = []) {
  const activePool = getPool();
  await activePool.query(sql, params);
}

export async function pingDb() {
  if (!hasDbConfig()) return false;
  try {
    await dbQuery<RowDataPacket[]>("SELECT 1 AS ok");
    return true;
  } catch {
    return false;
  }
}
