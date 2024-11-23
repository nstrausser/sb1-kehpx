import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toCamelCase } from "@/lib/utils";

export async function GET() {
  try {
    const installations = await db`
      SELECT 
        i.*,
        json_build_object(
          'id', u.id,
          'name', u.first_name || ' ' || u.last_name
        ) as installer,
        COALESCE(
          json_agg(
            json_build_object(
              'id', c.id,
              'installationId', c.installation_id,
              'panelName', c.panel_name,
              'squareFeet', c.square_feet,
              'rollId', c.roll_id,
              'filmType', c.film_type,
              'status', c.status,
              'recutReason', c.recut_reason,
              'notes', c.notes,
              'createdAt', c.created_at
            )
          ) FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) as cuts
      FROM installations i
      LEFT JOIN users u ON i.installer_id = u.id
      LEFT JOIN cuts c ON i.id = c.installation_id
      GROUP BY i.id, u.id
      ORDER BY i.date DESC
    `;
    return NextResponse.json(installations.map(toCamelCase));
  } catch (error) {
    console.error('Error fetching installations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch installations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cuts, ...installation } = body;

    // Start a transaction
    const result = await db.transaction(async (tx) => {
      // Create the installation
      const [newInstallation] = await tx`
        INSERT INTO installations ${tx(installation)}
        RETURNING *
      `;

      // Create the cuts if any
      if (cuts?.length) {
        await tx`
          INSERT INTO cuts ${tx(cuts.map(cut => ({
            ...cut,
            installation_id: newInstallation.id
          })))}
        `;
      }

      return newInstallation;
    });

    return NextResponse.json(toCamelCase(result));
  } catch (error) {
    console.error('Error creating installation:', error);
    return NextResponse.json(
      { error: 'Failed to create installation' },
      { status: 500 }
    );
  }
}