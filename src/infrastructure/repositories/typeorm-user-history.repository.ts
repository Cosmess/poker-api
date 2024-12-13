import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHistory } from '../../domain/entities/user-history.entity';
import { UserHistoryRepositoryInterface } from '../../domain/repositories/user-history.repository.interface';

@Injectable()
export class TypeORMUserHistoryRepository implements UserHistoryRepositoryInterface {
  constructor(
    @InjectRepository(UserHistory)
    private readonly userHistoryRepository: Repository<UserHistory>,
  ) {}

  async findByUser(userId: number): Promise<UserHistory[]> {
    return this.userHistoryRepository.find({ where: { user: { id: userId } }, relations: ['user', 'table'] });
  }

  async save(userHistory: UserHistory): Promise<UserHistory> {
    return this.userHistoryRepository.save(userHistory);
  }
}
