import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TableRepositoryInterface } from '../../../domain/repositories/table.repository.interface';
import { UserRepositoryInterface } from '../../../domain/repositories/user.repository.interface';

@Injectable()
export class AddPlayerUseCase {
  constructor(
    @Inject('TableRepositoryInterface')
    private readonly tableRepository: TableRepositoryInterface,
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(tableId: number, playerId: number): Promise<void> {
    const table = await this.tableRepository.findById(tableId);
    if (!table) throw new Error('Table not found');

    const player = await this.userRepository.findById(playerId);
    if (!player) throw new Error('Player not found');

    if (table.players.length >= 8) {
      throw new Error('Table is full');
    }

    table.players.push(player);
    await this.tableRepository.save(table);
  }
}
