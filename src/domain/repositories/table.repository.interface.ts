import { Table } from '../entities/table.entity';

export interface TableRepositoryInterface {
  findById(id: number): Promise<Table | null>;
  findAll(): Promise<Table[]>;
  save(table: Table): Promise<Table>;
  deleteById(id: number): Promise<void>;
}
