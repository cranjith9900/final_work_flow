import { AvailableAction } from './Zaps/AvailableAction.entity';
import { AvailableTrigger } from './Zaps/AvailableTrigger.entity';

import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'AutoX',
  entities: [AvailableTrigger, AvailableAction],
  synchronize: true, // only for dev!
});

async function main() {
  await dataSource.initialize();

  const triggerRepo = dataSource.getRepository(AvailableTrigger);
  const actionRepo = dataSource.getRepository(AvailableAction);

  await triggerRepo.save({
    id: 'webhook',
    name: 'Webhook',
    image: 'https://ibb.co/ymH74zzS', // <-- Replace with local asset if needed
  });

  await actionRepo.save([
    {
      id: 'Watsapp',
      name: 'Send Solana',
      image: 'https://ibb.co/ymH74zzS',
    },
    {
      id: 'email',
      name: 'Send Email',
      image: 'https://ibb.co/ymH74zzS',
    },
  ]);

  console.log('✅ Seeded!');
  await dataSource.destroy();
}

main();
