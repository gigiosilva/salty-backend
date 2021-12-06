import {
  Controller, Get, Post, Body, Param, Delete, Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserAddressService } from './user-address.service';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';

@ApiTags('User Address')
@Controller('users/:userId/addresses')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Post()
  create(
    @Param('userId') userId: string,
    @Body() createUserAddressDto: CreateUserAddressDto,
  ) {
    return this.userAddressService.create(createUserAddressDto, userId);
  }

  @Get()
  find(
    @Param('userId') userId: string,
  ) {
    return this.userAddressService.find(userId);
  }

  @Put()
  update(
    @Param('userId') userId: string,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ) {
    return this.userAddressService.update(userId, updateUserAddressDto);
  }

  @Delete()
  remove(
    @Param('userId') userId: string,
  ) {
    return this.userAddressService.remove(userId);
  }
}
