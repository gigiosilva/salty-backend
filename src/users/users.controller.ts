import {
  Controller, Get, Logger, UseGuards, Injectable,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthzService } from '../authz/authz.service';
import { AccessModel } from '../authz/access.model';

import { UsersService } from './users.service';
import { UserModel } from './user.model';

@ApiTags('Users')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer <access_token>',
})
@Injectable()
@Controller('users')
export class UsersController {
    private logger = new Logger('UsersController', { timestamp: true });

    constructor(
      private authzService: AuthzService,
      private usersService: UsersService,
    ) {}

    @ApiOperation({ summary: 'Get users' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiOkResponse({ description: 'Get all users.', type: UserModel, isArray: true })
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUsers() {
      this.logger.verbose('Retrieving all users from Auth0');

      // @TODO - apply strategy to not ask for the token in each request.
      const access: AccessModel = await this.authzService.getAccess();

      const users = await this.usersService.getUsers(access.access_token);

      return users;
    }
}
