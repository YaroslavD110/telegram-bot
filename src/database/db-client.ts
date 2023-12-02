import { createClient, Client, InStatement, ResultSet } from '@libsql/client';

import { Config } from '../config';
import { Logger } from '../logger';

const logger = new Logger(__filename);

export class DBClient {
  private readonly client: Client;

  constructor() {
    this.client = createClient({
      url: Config.TURSO_DB_URL,
      authToken: Config.TURSO_DB_TOKEN,
    });

    logger.info(`Connected to DB by url: ${Config.TURSO_DB_URL}`);
  }

  public exec(stmt: InStatement): Promise<ResultSet> {
    return this.client.execute(stmt);
  }
}

export const db = new DBClient();
