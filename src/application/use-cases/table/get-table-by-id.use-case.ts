import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TableRepositoryInterface } from '../../../domain/repositories/table.repository.interface';
import { Table } from '../../../domain/entities/table.entity';

@Injectable()
export class GetTableByIdUseCase {
  constructor(
    @Inject('TableRepositoryInterface')
    private readonly tableRepository: TableRepositoryInterface,
  ) {}

  async execute(id: number): Promise<Table> {
    const table = await this.tableRepository.findById(id);
    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }
    return table;
  }
}
