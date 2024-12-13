import { ListTablesUseCase } from '../../application/use-cases/table/list-tables.use-case';
import { TableRepositoryInterface } from '../../domain/repositories/table.repository.interface';
import { Table } from '../../domain/entities/table.entity';

describe('ListTablesUseCase', () => {
  let listTablesUseCase: ListTablesUseCase;
  let tableRepositoryMock: jest.Mocked<TableRepositoryInterface>;

  beforeEach(() => {
    tableRepositoryMock = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    } as jest.Mocked<TableRepositoryInterface>;

    listTablesUseCase = new ListTablesUseCase(tableRepositoryMock);
  });

  it('deve retornar uma lista de mesas', async () => {
    // Arrange
    const mockTables: Table[] = [
      { id: 1, name: 'Table 1', players: [] },
      { id: 2, name: 'Table 2', players: [] },
    ];

    tableRepositoryMock.findAll.mockResolvedValueOnce(mockTables);

    // Act
    const result = await listTablesUseCase.execute();

    // Assert
    expect(tableRepositoryMock.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockTables);
  });

  it('deve retornar uma lista vazia se não houver mesas', async () => {
    // Arrange
    tableRepositoryMock.findAll.mockResolvedValueOnce([]);

    // Act
    const result = await listTablesUseCase.execute();

    // Assert
    expect(tableRepositoryMock.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
