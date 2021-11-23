import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { AuthzService } from '../authz/authz.service';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [JwtModule.register({}), HttpModule],
  controllers: [UsersController],
  providers: [AuthzService, UsersService],
})
export class UsersModule {}
