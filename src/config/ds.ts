import { User } from '../user/user.entity';
import { Action } from '../Zaps/Action.entitty';
import { AvailableAction } from '../Zaps/AvailableAction.entity';
import { AvailableTrigger } from '../Zaps/AvailableTrigger.entity';
import { Trigger } from '../Zaps/Trigger.entity';
import { Zap } from '../Zaps/Zap.entity';
import { ZapRun } from '../Zaps/ZapRun.entity';
import { ZapRunOutbox } from '../Zaps/ZapRunOutbox.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'AutoX',
  synchronize: false,
  logging: false,
  entities: [
    Zap,
    ZapRun,
    ZapRunOutbox,
    Action,
    AvailableAction,
    User,
    Trigger,
    AvailableTrigger,
  ],
});
