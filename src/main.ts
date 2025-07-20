import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AvailableAction } from './Zaps/AvailableAction.entity';
import { AvailableTrigger } from './Zaps/AvailableTrigger.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = app.get<DataSource>(getDataSourceToken());
  if (dataSource.isInitialized) {
    console.log('✅ Connected to PostgreSQL');
  } else {
    console.log('❌ Not connected to PostgreSQL');
    return;
  }

  // // ✅ Seed AvailableTrigger (mail)
  // const triggerRepo = dataSource.getRepository(AvailableTrigger);
  // const mailTrigger = await triggerRepo.findOneBy({ id: 'mail' });
  // if (!mailTrigger) {
  //   await triggerRepo.save({
  //     id: 'mail',
  //     name: 'Mail',
  //     image: 'https://your-image-url.com/mail.png',
  //   });
  //   console.log('📬 Seeded trigger: Mail');
  // }

  // // ✅ Seed AvailableActions (whatsapp & slack)
  // const actionRepo = dataSource.getRepository(AvailableAction);

  // const whatsapp = await actionRepo.findOneBy({ id: 'whatsapp' });
  // if (!whatsapp) {
  //   await actionRepo.save({
  //     id: 'whatsapp',
  //     name: 'WhatsApp',
  //     image: 'https://your-image-url.com/whatsapp.png',
  //   });
  //   console.log('💬 Seeded action: WhatsApp');
  // }

  // const slack = await actionRepo.findOneBy({ id: 'slack' });
  // if (!slack) {
  //   await actionRepo.save({
  //     id: 'slack',
  //     name: 'Slack',
  //     image: 'https://your-image-url.com/slack.png',
  //   });
  //   console.log('🟣 Seeded action: Slack');
  // }

  await app.listen(3000);
}
bootstrap();
