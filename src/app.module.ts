import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ZapModule } from './Zaps/Zap.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    // ✅ Serve static files from /assets folder
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'assets'),
    //   serveRoot: '/assets', // This makes files available at http://localhost:3000/assets/*
    // }),

    // ✅ PostgreSQL setup with TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'AutoX',
      synchronize: true,
      autoLoadEntities: true,
    }),
    

    // ✅ Application Modules
   UserModule,
   ZapModule,
   AuthModule
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}