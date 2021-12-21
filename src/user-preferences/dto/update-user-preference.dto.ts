import { PartialType } from '@nestjs/swagger';

import { CreateUserPreferenceDto } from './create-user-preference.dto';

export class UpdateUserPreferenceDto extends PartialType(CreateUserPreferenceDto) {}
