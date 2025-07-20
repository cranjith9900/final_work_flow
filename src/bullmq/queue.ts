import { Queue } from 'bullmq';

export const zapQueue = new Queue('zap-queue', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});
