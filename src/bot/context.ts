import * as TelegramBot from 'node-telegram-bot-api';

import { UserModel } from '../database/models/user.model';
import { UserRepository } from '../database/repositories/user.repository';

export class MessageContext {
  private readonly userRepository = new UserRepository();

  public readonly message: TelegramBot.Message;
  public readonly bot: TelegramBot;

  public get chatId(): string {
    return this.message.chat.id.toString();
  }
  public get from(): TelegramBot.User | undefined {
    return this.message.from;
  }

  public user?: UserModel | null;

  constructor(message: TelegramBot.Message, bot: TelegramBot) {
    this.message = message;
    this.bot = bot;
  }

  public async populateData(): Promise<void> {
    if (!this.user) {
      this.user = await this.getUserForContextMessage();
    }
  }

  public async sendResponse(
    text: string,
    options?: TelegramBot.SendMessageOptions,
  ): Promise<void> {
    await this.bot.sendMessage(this.message.chat.id, text, options);
  }

  private async getUserForContextMessage(): Promise<UserModel | null> {
    if (!this.message.from?.id) {
      return null;
    }

    const user = await this.userRepository.getByTelegramId(this.chatId);

    if (
      user &&
      (this.message.from.username !== user.telegramUsername ||
        user.fullName !==
          this.message.from.first_name + ' ' + this.message.from.last_name)
    ) {
      await this.userRepository.update(user.id, {
        isActive: user.isActive,
        telegramUsername: this.message.from.username!,
        fullName:
          this.message.from.first_name + ' ' + this.message.from.last_name,
      });
    }

    return user;
  }
}
