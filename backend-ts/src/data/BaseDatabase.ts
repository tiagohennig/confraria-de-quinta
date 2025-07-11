import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export class BaseDatabase {
   protected static connection = knex({
      client: 'mysql2',
      connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
      port: 3306,
      multipleStatements: true,
      
      }
   });

   protected static queryBuilder() {
      return BaseDatabase.connection.queryBuilder();
   }
}