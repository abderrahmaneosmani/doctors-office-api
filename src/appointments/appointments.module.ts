import { Module } from '@nestjs/common';
import { AppointementsService } from './appointments.service';
import { AppointementsController } from './appointments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  controllers: [AppointementsController],
  providers: [AppointementsService],
  imports: [PrismaModule, PatientsModule, DoctorsModule],
})
export class AppointementsModule {}
