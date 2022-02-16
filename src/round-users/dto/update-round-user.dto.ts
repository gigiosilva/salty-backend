import { PartialType } from '@nestjs/swagger';

import { CreateRoundUserDto } from './create-round-user.dto';

export class UpdateRoundUserDto extends PartialType(CreateRoundUserDto) {}
