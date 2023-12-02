import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

import { Logger } from '../../logger';
import { MigrationScriptModule, MigrationType } from './model';

const logger = new Logger(__filename);
const migrationScriptsFolderPath = resolve(__dirname, './scripts');

async function main() {
  const targetMigation = process.argv[3];
  const miagrationType = getMigrationType();
  const migrationScripts = await readdir(migrationScriptsFolderPath);

  if (targetMigation) {
    const targetMigrationScript = migrationScripts.find(
      (scriptName) => scriptName === targetMigation,
    );

    if (!targetMigrationScript) {
      throw new Error(
        'Failed to found target migration! Avaliable migrations: ' +
          migrationScripts.join(),
      );
    }

    await executeMigration(targetMigrationScript, miagrationType);
    return;
  }

  for (const scriptName of migrationScripts) {
    await executeMigration(scriptName, miagrationType);
  }
}

function getMigrationType(): MigrationType {
  const typeArgValue = process.argv[2];

  if (typeArgValue === MigrationType.up) {
    return MigrationType.up;
  } else if (typeArgValue === MigrationType.down) {
    return MigrationType.down;
  } else {
    throw new Error('Invalid migation type was provided: ' + typeArgValue);
  }
}

async function executeMigration(
  migrationScriptName: string,
  migrationType: MigrationType,
): Promise<void> {
  // TODO: Make call in DB to check if script was executed or not

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const script: MigrationScriptModule = require(
    resolve(__dirname, migrationScriptsFolderPath, migrationScriptName),
  );

  if (typeof script[migrationType] !== 'function') {
    throw new Error(
      `Found broken migration script with ${migrationScriptName} name! Missing ${migrationType} migration type!`,
    );
  }

  logger.info(`Starting ${migrationScriptName} migration script ...`);
  await script[migrationType]();
  logger.info(`Migration script ${migrationScriptName} successfully executed!`);

  // TODO: Save script execution in DB
}

main()
  .then(() => logger.info(`Migration finished!`))
  .catch((error) => {
    logger.error(error);
    logger.error(`Failed to run migration!`);
    process.exit(1);
  });
