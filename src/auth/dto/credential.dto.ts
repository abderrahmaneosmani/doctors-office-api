import { ApiProperty } from '@nestjs/swagger';

export class CreateCredentialDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
