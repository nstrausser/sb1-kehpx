import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toCamelCase } from "@/lib/utils";

export async function GET() {
  try {
    const inventory = await db`
      SELECT *
      FROM ppf_rolls
      ORDER BY created_at DESC
    `;
    return NextResponse.json(inventory.map(toCamelCase));
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const [item] = await db`
      INSERT INTO ppf_rolls ${db(body)}
      RETURNING *
    `;
    return NextResponse.json(toCamelCase(item));
  } catch (error) {
    console.error('Error creating inventory item:', error);
    return NextResponse.json(
      { error: 'Failed to create inventory item' },
      { status: 500 }
    );
  }
}