import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  date_of_brirh: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
