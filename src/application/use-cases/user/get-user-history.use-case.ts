import { UserHistory } from '../../../domain/entities/user-history.entity';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { UserHistoryRepositoryInterface } from '../../../domain/repositories/user-history.repository.interface'

@Injectable()
export class GetUserHistoryUseCase {
  constructor(
    @Inject('UserHistoryRepositoryInterface')
    private readonly userHistoryRepository: UserHistoryRepositoryInterface,
  ) {}

  async execute(userId: number): Promise<UserHistory[]> {
    return this.userHistoryRepository.findByUser(userId);
  }
}
