
import { pool } from '../config/database.js';

const checkDatabaseConnection = async (): Promise<void> => {
  try {
    const result = await pool.query<{
      current_database: string;
      current_user: string;
      server_version: string;
    }>(`
      SELECT
        current_database(),
        current_user,
        version() AS server_version;
    `);

    console.log('PostgreSQL connection successful!');
    console.log(result.rows[0]);
  } catch (error) {
    console.error('PostgreSQL connection failed:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

await checkDatabaseConnection();
