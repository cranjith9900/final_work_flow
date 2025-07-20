require('dotenv').config();

import { Worker, Queue } from 'bullmq';
import { AppDataSource } from '../config/ds';
import { ZapRun } from 'src/Zaps/ZapRun.entity';
import { parse } from 'path';
import axios from 'axios';
import twilio from 'twilio';
import prisma from 'src/llb/db';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const zapQueue = new Queue('zap-queue', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startWorker() {
  await AppDataSource.initialize();
  const zapRunRepo = AppDataSource.getRepository(ZapRun);

  const worker = new Worker(
    'zap-queue',
    async (job) => {
      const { zapRunId, stage, id } = job.data;
      console.log(`➡️ Processing zapRunId: ${zapRunId}, ${stage}, ${id}`);

      const zapRun = await zapRunRepo.findOne({
        where: { id: zapRunId },
        relations: ['zap', 'zap.actions'],
      });

      console.log(`🧪 zapRun object:`, zapRun);

      if (!zapRun) {
        console.error('❌ ZapRun not found');
        return;
      }

      

      const currentAction = zapRun.zap.actions.find(
        (a) => a.sortingOrder === stage
      );
// const currentAction = await prisma.
//       console.log(`➡️ Current action:`, currentAction);
// const currentAction = await prisma.zap_run.findFirst({where:{id:zapRunId}})

      if (!currentAction) {
        console.error('❌ Current action not found');
        return;
      }

      const zapRunMetadata = zapRun.metadata;

      if (currentAction.id === 'mail') {
        console.log('📧 Mock: Sending email...');
        // await sendEmail(...)
      }

      if (currentAction.actionId === 'whatsapp') {
        console.log('📱 Sending WhatsApp message via API...');

  const to = zapRun.metadata?.phone || '+919663793349';
  const contentSid = currentAction.metadata?.contentSid || 'HX350d429d32e64a552466cafecbe95f3c';
  const variables = currentAction.metadata?.variables || { 1: '12/1', 2: '3pm' };

  try {
    const response = await axios.post('http://localhost:3000/zap/watsapp', {
      to,
      contentSid,
      variables,
    });

    console.log('✅ WhatsApp API response:', response.data);
  } catch (error) {
    console.error('❌ Error calling WhatsApp API:', error.message);
  }
      }

      await sleep(500);

      const lastStage = (zapRun.zap.actions.length || 1) - 1;
      if (stage < lastStage) {
        console.log('🔁 Adding next stage to queue');
        await zapQueue.add('process-zap', {
          zapRunId,
          stage: stage + 1,
        });
      }

      console.log('✅ Job complete');
    },
    {
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }
  );
}

startWorker(); // ✅ Call the function here!




