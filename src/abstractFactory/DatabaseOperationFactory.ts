// src/abstractFactory/DatabaseOperationFactory.ts
import { QueryExecutor } from "../factory/QueryExecutorFactory";

export interface DatabaseOperation {
  execute(): Promise<any>;
}

export class InsertOperation implements DatabaseOperation {
  constructor(
    private executor: QueryExecutor,
    private table: string,
    private data: any
  ) {}

  async execute(): Promise<any> {
    const columns = Object.keys(this.data).join(", ");
    const values = Object.values(this.data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING *`;
    return this.executor.execute(query, values);
  }
}

export class SelectOperation implements DatabaseOperation {
  constructor(
    private executor: QueryExecutor,
    private table: string,
    private conditions: any
  ) {}

  async execute(): Promise<any> {
    const whereClause = Object.keys(this.conditions)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(" AND ");
    const values = Object.values(this.conditions);
    const query = `SELECT * FROM ${this.table} WHERE ${whereClause}`;
    return this.executor.execute(query, values);
  }
}

export abstract class DatabaseOperationFactory {
  abstract createInsertOperation(table: string, data: any): DatabaseOperation;
  abstract createSelectOperation(
    table: string,
    conditions: any
  ): DatabaseOperation;
}

export class PostgresOperationFactory extends DatabaseOperationFactory {
  constructor(private executor: QueryExecutor) {
    super();
  }

  createInsertOperation(table: string, data: any): DatabaseOperation {
    return new InsertOperation(this.executor, table, data);
  }

  createSelectOperation(table: string, conditions: any): DatabaseOperation {
    return new SelectOperation(this.executor, table, conditions);
  }
}
