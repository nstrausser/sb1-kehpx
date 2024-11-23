import { db, toCamelCase, toSnakeCase } from '../db';
import type { Installation, Installer, PPFRoll, Appointment, Cut } from '@/types';

// Installer queries
export async function getInstallers() {
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
  return installers.map(toCamelCase);
}

export async function getInstallerById(id: string) {
  const [installer] = await db`
    SELECT 
      id,
      email,
      first_name,
      last_name,
      role,
      joined_date,
      created_at
    FROM users
    WHERE id = ${id}
  `;
  return installer ? toCamelCase(installer) : null;
}

export async function createInstaller(data: Omit<Installer, 'id'>) {
  const snakeData = toSnakeCase(data);
  const [installer] = await db`
    INSERT INTO users ${db(snakeData)}
    RETURNING *
  `;
  return toCamelCase(installer);
}

// Installation queries
export async function getInstallations() {
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
  return installations.map(toCamelCase);
}

// Add more queries for other entities...