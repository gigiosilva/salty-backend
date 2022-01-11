import { PartialType } from '@nestjs/swagger';

import { CreateRoundDto } from './create-round.dto';

export class UpdateRoundDto extends PartialType(CreateRoundDto) {}
