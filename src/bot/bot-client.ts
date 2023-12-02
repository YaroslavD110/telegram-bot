import * as TelegramBot from 'node-telegram-bot-api';

import { ICommand } from './model';
import { Logger } from '../logger';
import { HelloCommand } from './commands/hello.command';
import { handleNotFoundEvent } from './events/not-found';
import { StartCommand } from './commands/start.command';
import { MessageContext } from './context';

const logger = new Logger(__filename);

export class BotClient {
  private readonly bot: TelegramBot;
  private readonly commands: ICommand[] = [];

  constructor(botToken: string) {
    this.bot = new TelegramBot(botToken, { polling: true });

    this.commands.push(new HelloCommand(), new StartCommand());
  }

  public listen() {
    this.bot.on('message', this.handleIncommingMessage.bind(this));
  }

  private async handleIncommingMessage(
    msg: TelegramBot.Message,
  ): Promise<void> {
    const context = new MessageContext(msg, this.bot);

    if (/\/.+/.test(msg.text || '')) {
      await this.handleIncommingCommand(context);
      return;
    }

    // TODO: Add complete handle
    await handleNotFoundEvent(context);
  }

  private async handleIncommingCommand(
    messageContext: MessageContext,
  ): Promise<void> {
    await messageContext.populateData();

    logger.info(
      `Recived new command with ${messageContext.message.text} text.`,
    );
    this.bot.sendChatAction(messageContext.message.chat.id, 'typing');

    const commandHandler = this.commands.find((command) => {
      return command.check(messageContext);
    });

    if (commandHandler) {
      logger.info(`Handler for incomming command was found!`);
      await commandHandler.handle(messageContext);
    } else {
      logger.info(`Handler for incomming command was not found!`);
      await handleNotFoundEvent(messageContext);
    }
  }
}
