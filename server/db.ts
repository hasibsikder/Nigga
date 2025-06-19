import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import { type NeonQueryFunction } from '@neondatabase/serverless';
import { Logger } from '@/lib/logger';

// Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

// Type for our database instance
export type DB = ReturnType<typeof drizzle<typeof schema>>;

// Database connection state
let pool: Pool | null = null;
let db: DB | null = null;
let isConnecting = false;

/**
 * Initialize the database connection
 * @throws {Error} If connection fails
 */
async function initializeDB() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  if (pool) return; // Already connected

  if (isConnecting) {
    Logger.warn('Database connection already in progress');
    return;
  }

  isConnecting = true;
  Logger.info('Initializing database connection...');

  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      max: 10,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });

    // Test connection immediately
    const client = await pool.connect();
    try {
      await client.query('SELECT NOW()');
      Logger.info('Database connection test successful');
    } finally {
      client.release();
    }

    db = drizzle(pool, { 
      schema,
      logger: process.env.NODE_ENV === 'development'
    });

    Logger.info('Database connection ready');
  } catch (error) {
    pool = null;
    db = null;
    Logger.error('Database connection failed:', error);
    throw error;
  } finally {
    isConnecting = false;
  }
}

/**
 * Get the database instance
 * @returns {Promise<DB>} The database instance
 * @throws {Error} If connection fails
 */
export async function getDB(): Promise<DB> {
  if (!db) {
    await initializeDB();
  }
  if (!db) {
    throw new Error('Database connection not established');
  }
  return db;
}

/**
 * Close the database connection
 */
export async function closeDB(): Promise<void> {
  if (pool) {
    Logger.info('Closing database connection...');
    await pool.end();
    pool = null;
    db = null;
    Logger.info('Database connection closed');
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDB();
  process.exit(0);
});

// Export the connection pool and db instance
export { pool, db };
