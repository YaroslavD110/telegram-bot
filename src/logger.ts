import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from 'winston';
import { basename } from 'node:path';

export class Logger {
  private readonly winstonLogger: WinstonLogger;

  constructor(filename: string) {
    this.winstonLogger = createLogger({
      level: 'debug',
      format: format.combine(format.colorize(), format.simple()),
      transports: [new transports.Console()],
      defaultMeta: { filename: basename(filename) },
    });
  }

  public debug(message: string | number | object, ...meta: any[]): void {
    this.winstonLogger.debug(message.toString(), ...meta);
  }

  public info(message: string | number | object, ...meta: any[]): void {
    this.winstonLogger.info(message.toString(), ...meta);
  }

  public warn(message: string | number | object, ...meta: any[]): void {
    this.winstonLogger.warn(message.toString(), ...meta);
  }

  public error(message: string | number | object, ...meta: any[]): void {
    this.winstonLogger.error(message.toString(), ...meta);
  }
}
