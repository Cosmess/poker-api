import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TableRepositoryInterface } from '../../domain/repositories/table.repository.interface';
import { Table } from '../../domain/entities/table.entity';

@Injectable()
export class TypeORMTableRepository implements TableRepositoryInterface {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  async findById(id: number): Promise<Table | null> {
    return this.tableRepository.findOne({
      where: { id },
      relations: ['players'],
    });
  }

  async findAll(): Promise<Table[]> {
    return this.tableRepository.find({ relations: ['players'] });
  }

  async save(table: Table): Promise<Table> {
    return this.tableRepository.save(table);
  }

  async deleteById(id: number): Promise<void> {
    await this.tableRepository.delete(id);
  }
}
