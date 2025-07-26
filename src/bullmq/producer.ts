import { zapQueue } from './queue';
import { AppDataSource } from '../config/ds';
import { ZapRunOutbox } from '../Zaps/ZapRunOutbox.entity'; // ✅ Fixed path

async function main() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(ZapRunOutbox);

  while (1) {
    const pendingRows = await repo.find({
      take: 10,
    });

    if (pendingRows.length === 0) {
      await sleep(3000);
      continue;
    }

    console.log('Found rows:', pendingRows);

    // Add jobs to queue
    for (const row of pendingRows) {
      await zapQueue.add('process-zap', {
        zapRunId: row.zapRunId,
        stage: 0,
      });
    }

    // Delete enqueued rows
    const ids = pendingRows.map((row) => row.id);
    await repo.delete(ids);

    await sleep(3000);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main();
