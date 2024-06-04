import { Injectable } from '@nestjs/common';
import {
  CreateAppointmentDto,
  StatusAppointment,
} from './dto/create-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAppointementDto } from './dto/update-appointment.dto';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';
import { checkAvailableDate } from 'src/utils';

@Injectable()
export class AppointementsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly patient: PatientsService,
    private readonly doctor: DoctorsService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      const checkStartAppointment = createAppointmentDto.startDate;
      const checkEndAppointment = createAppointmentDto.endDate;

      const AvailablePatient = await this.patient.findAppointmentByStatus(
        createAppointmentDto.patient_id,
        StatusAppointment.Completed,
      );

      const availableDoctor = await this.doctor.findByStatus(
        createAppointmentDto.doctor_id,
        StatusAppointment.Completed,
      );

      const patientConflict = AvailablePatient?.appointements?.some(
        (appointement) => {
          const start = checkAvailableDate(
            checkStartAppointment,
            appointement.startDate,
            appointement.endDate,
          );
          const end = checkAvailableDate(
            checkEndAppointment,
            appointement.startDate,
            appointement.endDate,
          );
          return start && end;
        },
      );
      console.log('available', availableDoctor?.appointements);
      const doctorConflict = await availableDoctor?.appointements?.some(
        (appointement) => {
          const start = checkAvailableDate(
            checkStartAppointment,
            appointement.startDate,
            appointement.endDate,
          );
          const end = checkAvailableDate(
            checkEndAppointment,
            appointement.startDate,
            appointement.endDate,
          );
          return start && end;
        },
      );
      if (patientConflict) {
        throw new Error('The patient has a scheduling conflict.');
      }

      if (doctorConflict) {
        throw new Error('The doctor has a scheduling conflict.');
      }

      const appointement = await this.prisma.appointement.create({
        data: {
          startDate: new Date(createAppointmentDto.startDate),
          endDate: new Date(createAppointmentDto.endDate),
          reason: createAppointmentDto.reason,
          patient: {
            connect: { id: createAppointmentDto.patient_id },
          },
          doctor: {
            connect: { id: createAppointmentDto.doctor_id },
          },
          status: createAppointmentDto.status,
        },
      });

      return appointement.id;
    } catch (error) {
      console.log('error', error);
    }
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
