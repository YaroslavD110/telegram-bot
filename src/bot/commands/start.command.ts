import { ICommand } from '../model';
import { UserRepository } from '../../database/repositories/user.repository';
import { MessageContext } from '../context';

export class StartCommand implements ICommand {
  private readonly commandKey = '/start';
  private readonly userRepository = new UserRepository();

  public check(ctx: MessageContext): boolean {
    return ctx.message.text === this.commandKey;
  }

  public async handle(ctx: MessageContext): Promise<void> {
    if (!ctx.from || ctx.from.is_bot) {
      ctx.sendResponse('Щось дивне коється, я не розумію хто ти!');
      return;
    }

    if (!ctx.user) {
      await this.userRepository.create({
        chatId: ctx.chatId,
        telegramId: ctx.from.id.toString(),
        telegramUsername: ctx.from.username!,
        fullName: ctx.from.first_name + ' ' + ctx.from.last_name,
      });

      ctx.sendResponse('Радий тебе вітати друже!');
    } else {
      ctx.sendResponse('Так ми ж вже знайомі!');
    }
  }
}
