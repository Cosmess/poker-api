import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TableRepositoryInterface } from '../../../domain/repositories/table.repository.interface';
import { Table } from '../../../domain/entities/table.entity';

@Injectable()
export class ListTablesUseCase {
  constructor(
    @Inject('TableRepositoryInterface')
    private readonly tableRepository: TableRepositoryInterface,
  ) {}

  async execute(): Promise<Table[]> {
    return this.tableRepository.findAll();
  }
}
