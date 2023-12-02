import { MessageContext } from '../context';
import { EventHandlerFC } from '../model';

export const handleNotFoundEvent: EventHandlerFC = async (
  ctx: MessageContext,
) => {
  ctx.bot.sendMessage(
    ctx.message.chat.id,
    'Щось я не шарю, що ти хочеш від мене 🤨',
  );
};
