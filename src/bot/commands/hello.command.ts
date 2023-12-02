import { MessageContext } from '../context';
import { ICommand } from '../model';

export class HelloCommand implements ICommand {
  public check(ctx: MessageContext) {
    return false;
  }

  public async handle(ctx: MessageContext) {}
}
