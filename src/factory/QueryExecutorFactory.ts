import { Pool } from "pg";

export interface QueryExecutor {
  execute(query: string, params?: any[]): Promise<any>;
}

export class SimpleQueryExecutor implements QueryExecutor {
  constructor(private pool: Pool) {}

  async execute(query: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  }
}

export class TransactionQueryExecutor implements QueryExecutor {
  constructor(private pool: Pool) {}

  async execute(query: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(query, params);
      await client.query("COMMIT");
      return result.rows;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
}

export class QueryExecutorFactory {
  static createExecutor(
    type: "simple" | "transaction",
    pool: Pool
  ): QueryExecutor {
    switch (type) {
      case "simple":
        return new SimpleQueryExecutor(pool);
      case "transaction":
        return new TransactionQueryExecutor(pool);
      default:
        throw new Error("Invalid executor type");
    }
  }
}
