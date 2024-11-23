import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toCamelCase } from "@/lib/utils";

export async function GET() {
  try {
    const installers = await db`
      SELECT 
        id,
        email,
        first_name,
        last_name,
        role,
        joined_date,
        created_at
      FROM users
      ORDER BY last_name ASC
    `;
    return NextResponse.json(installers.map(toCamelCase));
  } catch (error) {
    console.error('Error fetching installers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch installers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const installer = await db`
      INSERT INTO users ${db(body)}
      RETURNING *
    `;
    return NextResponse.json(toCamelCase(installer[0]));
  } catch (error) {
    console.error('Error creating installer:', error);
    return NextResponse.json(
      { error: 'Failed to create installer' },
      { status: 500 }
    );
  }
}