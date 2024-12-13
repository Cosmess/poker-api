import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTableDto {
  @ApiProperty({
    description: 'O nome da mesa de poker',
    example: 'Mesa 1',
  })
  @IsString()
  name: string;
}
