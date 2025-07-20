
import { User } from 'src/user/user.entity';
import { Action } from 'src/Zaps/Action.entitty';
import { AvailableAction } from 'src/Zaps/AvailableAction.entity';
import { AvailableTrigger } from 'src/Zaps/AvailableTrigger.entity';
import { Trigger } from 'src/Zaps/Trigger.entity';
import { Zap } from 'src/Zaps/Zap.entity';
import { ZapRun } from 'src/Zaps/ZapRun.entity';
import { ZapRunOutbox } from 'src/Zaps/ZapRunOutbox.entity';
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
  entities: [Zap, ZapRun, ZapRunOutbox, Action, AvailableAction,User,Trigger,AvailableTrigger],
});
