import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';

import { JwtStrategy } from './jwt.strategy';
import { AuthzService } from './authz.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), HttpModule],
  providers: [JwtStrategy, AuthzService],
  exports: [PassportModule],
})
export class AuthzModule {}
