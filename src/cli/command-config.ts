import * as yargs from 'yargs';

export interface ICommandConfig<T> extends yargs.CommandModule {
  builder: {
    [k in keyof T]: yargs.Options
  };
  handler: (args: T) => void;
}
