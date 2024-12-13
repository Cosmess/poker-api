import { CreateTableUseCase } from '../../application/use-cases/table/create-table.use-case';
import { TableRepositoryInterface } from '../../domain/repositories/table.repository.interface';
import { Table } from '../../domain/entities/table.entity';

describe('CreateTableUseCase', () => {
  let createTableUseCase: CreateTableUseCase;
  let tableRepositoryMock: jest.Mocked<TableRepositoryInterface>;

  beforeEach(() => {
    tableRepositoryMock = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn()
    } as jest.Mocked<TableRepositoryInterface>;

    createTableUseCase = new CreateTableUseCase(tableRepositoryMock);
  });

  it('deve criar uma nova mesa', async () => {
    // Arrange
    const tableName = 'Test Table';
    const mockTable: Table = { id: 1, name: tableName, players: [] };

    tableRepositoryMock.save.mockResolvedValueOnce(mockTable);

    // Act
    const result = await createTableUseCase.execute(tableName);

    // Assert
    expect(tableRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining({
      name: tableName,
      players: [],
    }));
    expect(result).toEqual(mockTable);
  });

  it('deve lançar erro se o repositório falhar ao salvar', async () => {
    // Arrange
    const tableName = 'Test Table';

    tableRepositoryMock.save.mockRejectedValueOnce(new Error('Database error'));

    // Act & Assert
    await expect(createTableUseCase.execute(tableName)).rejects.toThrow('Database error');
    expect(tableRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining({
      name: tableName,
      players: [],
    }));
  });
});
