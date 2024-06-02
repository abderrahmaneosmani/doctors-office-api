import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @ApiProperty()
  patient_id: number;
  @IsNotEmpty()
  @ApiProperty()
  doctor_id: number;

  @ApiProperty()
  startDate: string;
  @ApiProperty()
  endDate: string;
  @ApiProperty()
  reason: string;
}
