import { Module } from '@nestjs/common';
// import { UserController } from './user.controller';
//import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])], 
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
