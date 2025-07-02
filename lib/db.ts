"use server";
import { neon } from '@neondatabase/serverless';

// Retrieve the database URL from environment variables
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create a reusable database connection
const sql = neon(databaseUrl);

export async function getDbConnection() {
  return sql;
}