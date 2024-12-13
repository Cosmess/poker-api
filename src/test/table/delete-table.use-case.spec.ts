import { DeleteTableUseCase } from '../../application/use-cases/table/delete-table.use-case';
import { TableRepositoryInterface } from '../../domain/repositories/table.repository.interface';
import { NotFoundException } from '@nestjs/common';

describe('DeleteTableUseCase', () => {
  let deleteTableUseCase: DeleteTableUseCase;
  let tableRepositoryMock: jest.Mocked<TableRepositoryInterface>;

  beforeEach(() => {
    tableRepositoryMock = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    } as jest.Mocked<TableRepositoryInterface>;

    deleteTableUseCase = new DeleteTableUseCase(tableRepositoryMock);
  });

  it('deve excluir uma mesa existente', async () => {
    // Arrange
    const tableId = 1;

    tableRepositoryMock.findById.mockResolvedValueOnce({ id: tableId, name: 'Test Table', players: [] });
    tableRepositoryMock.deleteById.mockResolvedValueOnce();

    // Act
    await deleteTableUseCase.execute(tableId);

    // Assert
    expect(tableRepositoryMock.findById).toHaveBeenCalledWith(tableId);
    expect(tableRepositoryMock.deleteById).toHaveBeenCalledWith(tableId);
  });

  it('deve lançar NotFoundException se a mesa não existir', async () => {
    // Arrange
    const tableId = 99;

    tableRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(deleteTableUseCase.execute(tableId)).rejects.toThrow(NotFoundException);
    expect(tableRepositoryMock.findById).toHaveBeenCalledWith(tableId);
    expect(tableRepositoryMock.deleteById).not.toHaveBeenCalled();
  });
});
