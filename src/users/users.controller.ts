import {
  Controller, Get, Logger, UseGuards, Injectable, Put, Param, Body,
} from '@nestjs/common';
import {
  ApiBody,
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
import { UpdateUserDto } from './dto/update-user.dto';

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

    @ApiOperation({ summary: 'Get user' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiOkResponse({ description: 'Get user.', type: UserModel })
    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    async getUser(@Param('id') id: string) {
      this.logger.verbose('Getting user');

      const access: AccessModel = await this.authzService.getAccess();

      const user = await this.usersService.getUser(access.access_token, id);

      return user;
    }

    @ApiOperation({ summary: 'Update user' })
    @ApiBody({ type: UpdateUserDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiOkResponse({ description: 'Update user.', type: UserModel })
    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
      this.logger.verbose('Updating user');

      const access: AccessModel = await this.authzService.getAccess();

      const user = await this.usersService.updateUser(access.access_token, id, body);

      return user;
    }
}
