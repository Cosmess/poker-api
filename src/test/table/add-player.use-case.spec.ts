import { AddPlayerUseCase } from '../../application/use-cases/table/add-player.use-case';
import { TableRepositoryInterface } from '../../domain/repositories/table.repository.interface';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { Table } from '../../domain/entities/table.entity';
import { User } from '../../domain/entities/user.entity';

describe('AddPlayerUseCase', () => {
  let addPlayerUseCase: AddPlayerUseCase;
  let tableRepositoryMock: jest.Mocked<TableRepositoryInterface>;
  let userRepositoryMock: jest.Mocked<UserRepositoryInterface>;

  beforeEach(() => {
    tableRepositoryMock = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn()
    } as jest.Mocked<TableRepositoryInterface>;

    userRepositoryMock = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      findByUsername: jest.fn(),
      deleteById: jest.fn(),
    } as jest.Mocked<UserRepositoryInterface>;

    addPlayerUseCase = new AddPlayerUseCase(tableRepositoryMock, userRepositoryMock);
  });

  it('deve adicionar um jogador a uma mesa existente', async () => {
    // Arrange
    const tableId = 1;
    const playerId = 2;

    const mockPlayer: User = { id: playerId, username: 'player_2', password: 'hashed_password' };
    const mockTable: Table = {
      id: tableId,
      name: 'Table 1',
      players: [],
    };

    tableRepositoryMock.findById.mockResolvedValueOnce(mockTable);
    userRepositoryMock.findById.mockResolvedValueOnce(mockPlayer);

    // Act
    await addPlayerUseCase.execute(tableId, playerId);

    // Assert
    expect(tableRepositoryMock.findById).toHaveBeenCalledWith(tableId);
    expect(userRepositoryMock.findById).toHaveBeenCalledWith(playerId);
    expect(tableRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining({
      id: tableId,
      players: [mockPlayer],
    }));
  });

  it('deve lançar erro se a mesa não existir', async () => {
    // Arrange
    const tableId = 1;
    const playerId = 2;

    tableRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(addPlayerUseCase.execute(tableId, playerId)).rejects.toThrow('Table not found');
    expect(tableRepositoryMock.findById).toHaveBeenCalledWith(tableId);
    expect(userRepositoryMock.findById).not.toHaveBeenCalled();
  });

  it('deve lançar erro se o jogador não existir', async () => {
    // Arrange
    const tableId = 1;
    const playerId = 2;

    const mockTable: Table = {
      id: tableId,
      name: 'Table 1',
      players: [],
    };

    tableRepositoryMock.findById.mockResolvedValueOnce(mockTable);
    userRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(addPlayerUseCase.execute(tableId, playerId)).rejects.toThrow('Player not found');
    expect(tableRepositoryMock.findById).toHaveBeenCalledWith(tableId);
    expect(userRepositoryMock.findById).toHaveBeenCalledWith(playerId);
    expect(tableRepositoryMock.save).not.toHaveBeenCalled();
  });

  it('deve lançar erro se a mesa estiver cheia', async () => {
    // Arrange
    const tableId = 1;
    const playerId = 9;

    const mockPlayer: User = { id: playerId, username: 'player_9', password: 'hashed_password' };
    const mockTable: Table = {
      id: tableId,
      name: 'Table 1',
      players: Array(8).fill({ id: 1, username: 'player', password: 'hashed_password' }),
    };

    tableRepositoryMock.findById.mockResolvedValueOnce(mockTable);
    userRepositoryMock.findById.mockResolvedValueOnce(mockPlayer);

    // Act & Assert
    await expect(addPlayerUseCase.execute(tableId, playerId)).rejects.toThrow('Table is full');
    expect(tableRepositoryMock.findById).toHaveBeenCalledWith(tableId);
    expect(userRepositoryMock.findById).toHaveBeenCalledWith(playerId);
    expect(tableRepositoryMock.save).not.toHaveBeenCalled();
  });
});
