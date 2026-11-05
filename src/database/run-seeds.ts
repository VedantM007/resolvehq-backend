import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from '../config/database.js';
import type { PoolClient } from 'pg';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const seedsDirectory = path.resolve(
  currentDirectory,
  '../../database/seeds'
);

const runSeeds = async (): Promise<void> => {
   let client: PoolClient | undefined;

  try {
    client = await pool.connect();
    const files = (await readdir(seedsDirectory))
      .filter((file) => file.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      console.log('No seed files found.');
      return;
    }

    for (const file of files) {
      const filePath = path.join(seedsDirectory, file);
      const sql = await readFile(filePath, 'utf-8');

      console.log(`Running seed: ${file}`);

      await client.query('BEGIN');

      try {
        await client.query(sql);
        await client.query('COMMIT');

        console.log(`Seed completed: ${file}`);
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      }
    }

    console.log('All seeds completed successfully.');
  } finally {
    client?.release();
    await pool.end();
  }
};

runSeeds().catch((error: unknown) => {
  console.error('Seed execution failed:', error);
  process.exitCode = 1;
});