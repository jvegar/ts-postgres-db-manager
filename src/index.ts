// src/index.ts
import { DatabaseConnection } from "./singleton/DatabaseConnection";
import { QueryExecutorFactory } from "./factory/QueryExecutorFactory";
import { PostgresOperationFactory } from "./abstractFactory/DatabaseOperationFactory";

async function main() {
  const config = {
    user: "postgres",
    host: "localhost",
    database: "mydb",
    password: "postgres",
    port: 5432,
  };

  const dbConnection = DatabaseConnection.getInstance(config);
  const pool = dbConnection.getPool();

  const executor = QueryExecutorFactory.createExecutor("simple", pool);
  const operationFactory = new PostgresOperationFactory(executor);

  const insertOperation = operationFactory.createInsertOperation("users", {
    name: "John Doe",
    email: "john@example.com",
  });
  const selectOperation = operationFactory.createSelectOperation("users", {
    email: "john@example.com",
  });

  try {
    const insertResult = await insertOperation.execute();
    console.log("Insert Result:", insertResult);

    const selectResult = await selectOperation.execute();
    console.log("Select Result:", selectResult);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await pool.end();
  }
}

main();
