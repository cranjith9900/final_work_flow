import { Module } from '@nestjs/common';
// import { ZapController } from './Zap.controller';
import { ZapService } from './Zap.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zap } from './Zap.entity';
import { Action } from './Action.entitty';
import { Trigger } from './Trigger.entity'; // ✅ ADD THIS
import { AvailableAction } from './AvailableAction.entity';
import { AvailableTrigger } from './AvailableTrigger.entity';
import { ZapRun } from './ZapRun.entity';
import { ZapRunOutbox } from './ZapRunOutbox.entity';
import { ZapController } from './Zap.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Zap,
      Action,
      Trigger, // ✅ ADD THIS
      AvailableAction,
      AvailableTrigger,
      ZapRun,
      ZapRunOutbox,
    ]),
  ],
  exports: [TypeOrmModule],
 
   providers: [ZapService],
  controllers: [ZapController],
})
export class ZapModule {}
