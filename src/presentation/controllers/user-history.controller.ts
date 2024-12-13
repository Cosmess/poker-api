import { Controller, Get, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserHistoryUseCase } from '../../application/use-cases/user/get-user-history.use-case';
import { ExcludePasswordInterceptor } from '../interceptors/exclude-password.interceptor';

@ApiTags('User History')
@ApiBearerAuth('access-token')
@Controller('users')
export class UserHistoryController {
  constructor(private readonly getUserHistoryUseCase: GetUserHistoryUseCase) {}

  @Get(':id/history')
  @ApiOperation({ summary: 'Obter o histórico de um usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Histórico do usuário.',
    schema: {
      example: [
        {
          id: 1,
          user: { id: 1, username: 'john_doe' },
          table: { id: 1, name: 'Mesa 1' },
          isWinner: true,
          createdAt: '2024-12-13T10:30:00Z',
        },
        {
          id: 2,
          user: { id: 1, username: 'john_doe' },
          table: { id: 2, name: 'Mesa 2' },
          isWinner: false,
          createdAt: '2024-12-14T12:00:00Z',
        },
      ],
    },
  })
  @UseInterceptors(ExcludePasswordInterceptor)
  async getUserHistory(@Param('id', ParseIntPipe) userId: number) {
    return this.getUserHistoryUseCase.execute(userId);
  }
}
