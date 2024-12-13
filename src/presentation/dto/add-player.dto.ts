import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddPlayerDto {
  @ApiProperty({
    description: 'ID do usuário que será adicionado à mesa',
    example: 1,
  })
  @IsNumber()
  userId: number;
}
