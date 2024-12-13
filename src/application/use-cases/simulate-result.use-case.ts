import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TableRepositoryInterface } from '../../domain/repositories/table.repository.interface';
import { UserHistoryRepositoryInterface } from '../../domain/repositories/user-history.repository.interface';
import { UserHistory } from '../../domain/entities/user-history.entity';

@Injectable()
export class SimulateResultUseCase {
  constructor(
    @Inject('TableRepositoryInterface')
    private readonly tableRepository: TableRepositoryInterface,
    @Inject('UserHistoryRepositoryInterface')
    private readonly userHistoryRepository: UserHistoryRepositoryInterface,
  ) {}

  async execute(tableId: number): Promise<number> {
    const table = await this.tableRepository.findById(tableId);
    if (!table) {
      throw new NotFoundException(`Table with ID ${tableId} not found`);
    }

    if (table.players.length < 2) {
      throw new BadRequestException('A table must have at least 2 players');
    }

    const winnerIndex = Math.floor(Math.random() * table.players.length);
    const winner = table.players[winnerIndex];

    for (const player of table.players) {
      const userHistory = new UserHistory();
      userHistory.user = player;
      userHistory.table = table;
      userHistory.isWinner = player.id === winner.id;

      await this.userHistoryRepository.save(userHistory);
    }

    return winner.id;
  }
}
