import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toCamelCase } from "@/lib/utils";

export async function GET() {
  try {
    const appointments = await db`
      SELECT 
        a.*,
        json_build_object(
          'id', u.id,
          'name', u.first_name || ' ' || u.last_name
        ) as installer
      FROM appointments a
      LEFT JOIN users u ON a.installer_id = u.id
      ORDER BY a.date DESC
    `;
    return NextResponse.json(appointments.map(toCamelCase));
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const [appointment] = await db`
      INSERT INTO appointments ${db(body)}
      RETURNING *
    `;
    return NextResponse.json(toCamelCase(appointment));
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}