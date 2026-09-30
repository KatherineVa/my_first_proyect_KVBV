import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'usuario@empresa.com' })
  email: string;

  @ApiProperty({ required: true, example: 'John Doe' })
  name: string;

  @ApiProperty({ required: true, example: 'password123' })
  password: string;

  @ApiProperty({ required: false, example: '+505 8888 0000' })
  telephone?: string;

  @ApiProperty({ required: true, example: 1, description: 'ID del tenant' })
  tenantId: number;
}