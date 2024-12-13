import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TableRepositoryInterface } from '../../../domain/repositories/table.repository.interface';

@Injectable()
export class DeleteTableUseCase {
  constructor(
    @Inject('TableRepositoryInterface')
    private readonly tableRepository: TableRepositoryInterface,
  ) {}

  async execute(id: number): Promise<void> {
    const table = await this.tableRepository.findById(id);
    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }
    await this.tableRepository.deleteById(id);
  }
}
