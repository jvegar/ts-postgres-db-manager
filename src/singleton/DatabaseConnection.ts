import { Pool, PoolConfig } from 'pg';

export class DatabaseConnection {
	private static instance: DatabaseConnection;
	private pool: Pool;
	
	private constructor(config: PoolConfig) {
		this.pool = new Pool(config);
	}

	public static getInstance(config: PoolConfig): DatabaseConnection {
		if (!DatabaseConnection.instance) {
			DatabaseConnection.instance = new DatabaseConnection(config);
		}
		return DatabaseConnection.instance;
	}

	public getPool(): Pool {
		return this.pool;
	}
}

