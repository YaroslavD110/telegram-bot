import { config as dotEnvConfig } from 'dotenv-safe';

dotEnvConfig();

export class Config {
  public static DEV: boolean = process.env.DEV === 'true';
  public static TELEGRAM_BOT_TOKEN: string = process.env.TELEGRAM_BOT_TOKEN!;
  public static TURSO_DB_URL: string = process.env.TURSO_DB_URL!;
  public static TURSO_DB_TOKEN: string = process.env.TURSO_DB_TOKEN!;
}
