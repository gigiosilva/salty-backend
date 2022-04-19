import {
  ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Express } from 'express';

import { CloudinaryService } from './../third-party/cloudinary.service';
import { CreateRoundUserDto } from './dto/create-round-user.dto';
import { RoundUsersRepository } from './round-users.repository';
import { RoundUser } from './round-user.entity';
import { UpdateRoundUserDto } from './dto/update-round-user.dto';

@Injectable()
export class RoundUsersService {
  private logger = new Logger('RoundUsersService', { timestamp: true });

  constructor(
    @InjectRepository(RoundUsersRepository)
    private roundUsersRepository: RoundUsersRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(userId: string, roundId: string, createRoundUserDto: CreateRoundUserDto) {
    try {
      return await this.roundUsersRepository.createRoundUser(userId, roundId, createRoundUserDto);
    } catch (error) {
      this.logger.error(error);
      if (error.code === '23505') { throw new ConflictException('RoundUser already exists'); }

      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async findOne(userId: string, roundId: string) {
    return this.roundUsersRepository.findOne({ where: { userId, roundId } });
  }

  async findAll(roundId: string) {
    return this.roundUsersRepository.find({ roundId });
  }

  async update(userId: string, roundId: string, updateRoundUserDto: UpdateRoundUserDto) {
    const roundUser: RoundUser = await this.findOne(userId, roundId);
    if (!roundUser) throw new NotFoundException();

    return this.roundUsersRepository.save({
      id: roundUser.id,
      ...roundUser,
      ...updateRoundUserDto,
    });
  }

  async remove(userId: string, roundId: string) {
    const result = await this.roundUsersRepository.delete({ userId, roundId });

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async uploadGift(userId: string, roundId: string, file: Express.Multer.File) {
    const roundUser: RoundUser = await this.findOne(userId, roundId);
    if (!roundUser) throw new NotFoundException();

    const uploadedPhoto = await this.cloudinaryService.uploadPhoto(`rounds/${roundId}/${userId}`, file);

    return this.update(userId, roundId, { giftPhoto: uploadedPhoto.secure_url });
  }
}
