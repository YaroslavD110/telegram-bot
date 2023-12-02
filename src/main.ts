import { Logger } from './logger';
import { BotClient } from './bot/bot-client';
import { Config } from './config';

const logger = new Logger(__filename);

async function main() {
  const bot = new BotClient(Config.TELEGRAM_BOT_TOKEN);

  bot.listen();
}

main()
  .then(() => logger.info(`Service succussfully started!`))
  .catch((error) => {
    logger.error(`Failed to start service!`);
    logger.error(error);
    process.exit(1);
  });
