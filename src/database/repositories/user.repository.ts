import { db } from '../db-client';
import {
  UserCreateFields,
  UserModel,
  UserUpdateFields,
} from '../models/user.model';

export class UserRepository {
  public async getById(id: number): Promise<UserModel | null> {
    const queryResult = await db.exec({
      sql: 'select * from users where id = ?;',
      args: [id],
    });

    if (queryResult.rows.length !== 1) {
      return null;
    }

    return UserModel.fromRawData(queryResult.rows[0]);
  }

  public async getByTelegramId(telegramId: string): Promise<UserModel | null> {
    const queryResult = await db.exec({
      sql: 'SELECT * FROM users WHERE telegram_id = ?;',
      args: [telegramId],
    });

    if (queryResult.rows.length !== 1) {
      return null;
    }

    return UserModel.fromRawData(queryResult.rows[0]);
  }

  public async create(data: UserCreateFields): Promise<UserModel | null> {
    const queryResult = await db.exec({
      sql: 'INSERT INTO users (telegram_id, chat_id, full_name, telegram_username) VALUES (?, ?, ?, ?)',
      args: [
        data.telegramId,
        data.chatId,
        data.fullName,
        data.telegramUsername,
      ],
    });
    if (queryResult.rowsAffected !== 1) {
      throw new Error('Failed to save user!');
    }

    return this.getByTelegramId(data.telegramId);
  }

  public async update(
    id: number,
    data: UserUpdateFields,
  ): Promise<UserModel | null> {
    const queryResult = await db.exec({
      sql: 'UPDATE users SET full_name = ?, telegram_username = ?, is_active = ? WHERE id = ?',
      args: [data.fullName, data.telegramUsername, data.isActive ? 1 : 0, id],
    });
    if (queryResult.rowsAffected !== 1) {
      throw new Error('Failed to save user!');
    }

    return this.getById(id);
  }
}
