import {
  Controller, Get, Post, Body, Param, Delete, Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserPreferencesService } from './user-preferences.service';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';

@ApiTags('User Preferences')
@Controller('users/:userId/preferences')
export class UserPreferencesController {
  constructor(private readonly userPreferencesService: UserPreferencesService) {}

  @Post()
  create(
    @Body() createUserPreferenceDto: CreateUserPreferenceDto,
    @Param('userId') userId: string,
  ) {
    return this.userPreferencesService.create(createUserPreferenceDto, userId);
  }

  @Get()
  find(
    @Param('userId') userId: string,
  ) {
    return this.userPreferencesService.find(userId);
  }

  @Put()
  update(
    @Param('userId') userId: string,
    @Body() updateUserPreferenceDto: UpdateUserPreferenceDto,
  ) {
    return this.userPreferencesService.update(userId, updateUserPreferenceDto);
  }

  @Delete()
  remove(
    @Param('userId') userId: string,
  ) {
    return this.userPreferencesService.remove(userId);
  }
}
