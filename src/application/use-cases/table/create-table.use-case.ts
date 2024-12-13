import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TableRepositoryInterface } from '../../../domain/repositories/table.repository.interface';
import { Table } from '../../../domain/entities/table.entity';

@Injectable()
export class CreateTableUseCase {
  constructor(
    @Inject('TableRepositoryInterface')
    private readonly tableRepository: TableRepositoryInterface,
  ) {}

  async execute(name: string): Promise<Table> {
    const table = new Table();
    table.name = name;
    table.players = [];

    return this.tableRepository.save(table);
  }
}
