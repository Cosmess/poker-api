import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'O nome de usuário do usuário',
    example: 'john_doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'A senha do usuário',
    example: '123456',
  })
  @IsString()
  password: string;
}
