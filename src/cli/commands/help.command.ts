import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
            ${chalk.redBright('Программа для подготовки данных для REST API сервера.')}
            ${chalk.green('Пример:')}
                cli.js --<command> [--arguments]
            ${chalk.green('Команды:')}
                --version:                   # выводит номер версии
                --help:                      # печатает этот текст
                --import <path>:             # импортирует данные из TSV
                --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
        `);
  }
}
