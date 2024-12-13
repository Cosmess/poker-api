import { SimulateResultUseCase } from '../application/use-cases/simulate-result.use-case';
import { TableRepositoryInterface } from '../domain/repositories/table.repository.interface';
import { UserHistoryRepositoryInterface } from '../domain/repositories/user-history.repository.interface';
import { Table } from '../domain/entities/table.entity';
import { User } from '../domain/entities/user.entity';
import { UserHistory } from '../domain/entities/user-history.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('SimulateResultUseCase', () => {
  let simulateResultUseCase: SimulateResultUseCase;
  let tableRepositoryMock: jest.Mocked<TableRepositoryInterface>;
  let userHistoryRepositoryMock: jest.Mocked<UserHistoryRepositoryInterface>;

  beforeEach(() => {
    tableRepositoryMock = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    } as jest.Mocked<TableRepositoryInterface>;

    userHistoryRepositoryMock = {
      findByUser: jest.fn(),
      save: jest.fn(),
    } as jest.Mocked<UserHistoryRepositoryInterface>;

    simulateResultUseCase = new SimulateResultUseCase(
      tableRepositoryMock,
      userHistoryRepositoryMock,
    );
  });

  it('deve simular um resultado para uma mesa com jogadores', async () => {
    // Arrange
    const tableId = 1;
    const players: User[] = [
      { id: 1, username: 'player1', password: 'hashed_password1' },
      { id: 2, username: 'player2', password: 'hashed_password2' },
    ];
    const mockTable: Table = { id: tableId, name: 'Test Table', players };

    tableRepositoryMock.findById.mockResolvedValueOnce(mockTable);

    const savedHistories: UserHistory[] = [];
    userHistoryRepositoryMock.save.mockImplementation((history) => {
      savedHistories.push(history);
      return Promise.resolve(history);
    });

    jest.spyOn(Math, 'random').mockReturnValue(0.3);

    // Act
    const winnerId = await simulateResultUseCase.execute(tableId);

    // Assert
    expect(tableRepositoryMock.findById).toHaveBeenCalledWith(tableId);
    expect(userHistoryRepositoryMock.save).toHaveBeenCalledTimes(players.length);

    expect(savedHistories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ user: players[0], isWinner: true }),
        expect.objectContaining({ user: players[1], isWinner: false }),
      ]),
    );

    expect(winnerId).toBe(players[0].id);
  });

  it('deve lançar NotFoundException se a mesa não existir', async () => {
    // Arrange
    const tableId = 99;

    tableRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(simulateResultUseCase.execute(tableId)).rejects.toThrow(NotFoundException);
    expect(tableRepositoryMock.findById).toHaveBeenCalledWith(tableId);
    expect(userHistoryRepositoryMock.save).not.toHaveBeenCalled();
  });

  it('deve lançar BadRequestException se a mesa tiver menos de 2 jogadores', async () => {
    // Arrange
    const tableId = 1;
    const players: User[] = [{ id: 1, username: 'player1', password: 'hashed_password1' }];
    const mockTable: Table = { id: tableId, name: 'Test Table', players };

    tableRepositoryMock.findById.mockResolvedValueOnce(mockTable);

    // Act & Assert
    await expect(simulateResultUseCase.execute(tableId)).rejects.toThrow(BadRequestException);
    expect(tableRepositoryMock.findById).toHaveBeenCalledWith(tableId);
    expect(userHistoryRepositoryMock.save).not.toHaveBeenCalled();
  });
});
