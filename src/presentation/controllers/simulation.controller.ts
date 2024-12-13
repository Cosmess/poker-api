import { Controller, Post, Param } from '@nestjs/common';
import { SimulateResultUseCase } from '../../application/use-cases/simulate-result.use-case';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('simulation')
@ApiBearerAuth('access-token')
export class SimulationController {
  constructor(private readonly simulateResultUseCase: SimulateResultUseCase) {}

  @Post(':id')
  async simulate(@Param('id') tableId: number) {
    const winnerId = await this.simulateResultUseCase.execute(tableId);
    return { winnerId };
  }
}
