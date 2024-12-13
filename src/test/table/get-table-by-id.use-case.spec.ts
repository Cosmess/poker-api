import { GetTableByIdUseCase } from '../../application/use-cases/table/get-table-by-id.use-case';
import { TableRepositoryInterface } from '../../domain/repositories/table.repository.interface';
import { Table } from '../../domain/entities/table.entity';
import { NotFoundException } from '@nestjs/common';

describe('GetTableByIdUseCase', () => {
  let getTableByIdUseCase: GetTableByIdUseCase;
  let tableRepositoryMock: jest.Mocked<TableRepositoryInterface>;

  beforeEach(() => {
    tableRepositoryMock = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    } as jest.Mocked<TableRepositoryInterface>;

    getTableByIdUseCase = new GetTableByIdUseCase(tableRepositoryMock);
  });

  it('deve retornar uma mesa existente', async () => {
    // Arrange
    const tableId = 1;
    const mockTable: Table = {
      id: tableId,
      name: 'Test Table',
      players: [],
    };

    tableRepositoryMock.findById.mockResolvedValueOnce(mockTable);

    // Act
    const result = await getTableByIdUseCase.execute(tableId);

    // Assert
    expect(tableRepositoryMock.findById).toHaveBeenCalledWith(tableId);
    expect(result).toEqual(mockTable);
  });

  it('deve lançar NotFoundException se a mesa não existir', async () => {
    // Arrange
    const tableId = 99;

    tableRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(getTableByIdUseCase.execute(tableId)).rejects.toThrow(NotFoundException);
    expect(tableRepositoryMock.findById).toHaveBeenCalledWith(tableId);
  });
});
