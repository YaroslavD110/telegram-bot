export enum MigrationType {
  up = 'up',
  down = 'down',
}

export interface MigrationScriptModule {
  [MigrationType.up]: () => Promise<void>;
  [MigrationType.down]: () => Promise<void>;
}
