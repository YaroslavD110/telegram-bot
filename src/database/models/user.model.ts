export class UserModel {
  public id: number;
  public telegramId: string;
  public chatId: string;
  public isActive: boolean;
  public fullName: string;
  public telegramUsername: string;
  public updatedAt: Date;
  public createdAt: Date;

  public static fromRawData(rawData: Record<string, any>) {
    const user = new UserModel();

    user.id = rawData.id;
    user.fullName = rawData.full_name;
    user.chatId = rawData.chat_id;
    user.isActive = rawData.is_active === 1;
    user.telegramId = rawData.telegram_id;
    user.telegramUsername = rawData.telegram_username;
    user.updatedAt = new Date(rawData.updated_at);
    user.createdAt = new Date(rawData.created_at);

    return user;
  }
}

export type UserCreateFields = Omit<
  UserModel,
  'id' | 'isActive' | 'createdAt' | 'updatedAt'
>;

export type UserUpdateFields = Omit<
  UserModel,
  'id' | 'createdAt' | 'updatedAt' | 'telegramId' | 'chatId'
>;
