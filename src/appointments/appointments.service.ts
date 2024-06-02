import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAppointementDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointementsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAppointementDto: CreateAppointmentDto) {
    const appointement = await this.prisma.appointement.create({
      data: {
        startDate: new Date(createAppointementDto.startDate),
        endDate: new Date(createAppointementDto.endDate),
        reason: createAppointementDto.reason,
        patient: {
          connect: { id: createAppointementDto.patient_id },
        },
        doctor: {
          connect: { id: createAppointementDto.doctor_id },
        },
        status: 'Pending',
      },
    });

    return appointement.id;
  }

  async findAll() {
    return await this.prisma.appointement.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.appointement.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateAppointementDto: UpdateAppointementDto) {
    return await this.prisma.appointement.update({
      where: { id },
      data: updateAppointementDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.appointement.delete({
      where: { id },
    });
  }
}
