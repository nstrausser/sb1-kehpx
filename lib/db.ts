import postgres from 'postgres';
import { sql } from '@vercel/postgres';

// Use Vercel's connection in production, and postgres in development
export const db = process.env.VERCEL_ENV === 'production' 
  ? sql
  : postgres(process.env.POSTGRES_URL!);

// Helper to convert snake_case to camelCase
export function toCamelCase<T extends Record<string, any>>(obj: T): T {
  const newObj: any = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    newObj[camelKey] = obj[key];
  }
  return newObj;
}

// Helper to convert camelCase to snake_case
export function toSnakeCase<T extends Record<string, any>>(obj: T): T {
  const newObj: any = {};
  for (const key in obj) {
    const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    newObj[snakeKey] = obj[key];
  }
  return newObj;
}