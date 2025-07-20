require('dotenv').config(); // ✅ Must be before accessing process.env

import { Body, Injectable, Post, Res } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AvailableTrigger } from './AvailableTrigger.entity';
import { DataSource, Repository } from 'typeorm';
import { AvailableAction } from './AvailableAction.entity';
import { Zap } from './Zap.entity';
import { Action } from './Action.entitty';
import { Trigger } from './Trigger.entity';
import { ZapCreateDto } from './dto/create-zap.dto';
import { ZapRunOutbox } from './ZapRunOutbox.entity';
import { ZapRun } from './ZapRun.entity';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

@Injectable()
export class ZapService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async createZap(userId: number, data: ZapCreateDto): Promise<string> {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const zap = await queryRunner.manager.save(Zap, {
      userId,
      triggerId: '', // to be updated after trigger creation
    });

    const actions = data.actions.map((action, index) => {
      const newAction = new Action();
      newAction.zap = zap;
      newAction.actionId = action.availableActionId.trim(); // 🧼 Trim here
      newAction.sortingOrder = index;
      newAction.metadata = action.actionMetadata;
      return newAction;
    });

    await queryRunner.manager.save(Action, actions);

    const trigger = await queryRunner.manager.save(Trigger, {
      zap,
      triggerId: data.availableTriggerId.trim(), // 🧼 Trim here
      metadata: {},
    });

    zap.triggerId = trigger.id;
    await queryRunner.manager.save(Zap, zap);

    await queryRunner.commitTransaction();
    return zap.id;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}

  async getZapsByUser(userId: number): Promise<Zap[]> {
    return this.dataSource.getRepository(Zap).find({
      where: { userId },
      relations: ['trigger', 'actions'] // Load related entities if needed // optional
    });
  }

   async getAll(): Promise<ZapRunOutbox[]> {
    return this.dataSource.getRepository(ZapRunOutbox).find({
      relations: ['zapRun'], // load related ZapRun if needed
      order: { id: 'DESC' }, // optional: sort by latest
    });
  }

  async processWebhook(userId: string, zapId: string, payload: any): Promise<void> {
    await this.dataSource.transaction(async manager => {
      // 1. Create ZapRun
      const zapRun = manager.create(ZapRun, {
        zapId,
        metadata: payload,
      });
      const savedZapRun = await manager.save(ZapRun, zapRun);

      // 2. Create ZapRunOutbox
      const outbox = manager.create(ZapRunOutbox, {
        zapRunId: savedZapRun.id,
        zapRun: savedZapRun,
      });
      await manager.save(ZapRunOutbox, outbox);
    });
  }
  async getZapRunById(id: string) {
  const zapRunRepo = this.dataSource.getRepository(ZapRun);

  const zapRun = await zapRunRepo.findOne({
    where: { id },
    relations: ['zap', 'zap.actions'],
  });

  return zapRun;
}
 async sendTemplateMessage(
    to: string,
    contentSid: string,
    variables: Record<string, string>
  ): Promise<string> {
    const message = await client.messages.create({
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${to}`,
      contentSid,
      contentVariables: JSON.stringify(variables),
    });

    console.log('✅ WhatsApp sent:', message.sid);
    return message.sid;
  }
}
