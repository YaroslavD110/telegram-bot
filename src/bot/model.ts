import { MessageContext } from './context';

export interface ICommand {
  check: (ctx: MessageContext) => boolean;
  handle: (ctx: MessageContext) => Promise<void>;
}

export type EventHandlerFC = (ctx: MessageContext) => Promise<void>;
