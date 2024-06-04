import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusAppointment } from 'src/appointments/dto/create-appointment.dto';
import { cryptPassword } from 'src/auth/utils';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    const { firstname, lastname, email, password } = createPatientDto.user;

    const hashPassword = await cryptPassword(password);

    try {
      return await this.prisma.$transaction(async (tr) => {
        const user = await tr.user.create({
          data: {
            firstname,
            lastname,
            email,
            password: hashPassword,
            role: 'PATIENT',
          },
        });

        const patient = await tr.patient.create({
          data: {
            userId: user.id,
            date_of_brirh: new Date('2020'),
            address: createPatientDto.address,
          },
        });

        return { user, patient };
      });
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.patient.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.patient.findUnique({
      where: {
        id,
      },
      include: {
        appointements: true,
      },
    });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const { address, date_of_brirh } = updatePatientDto;
    const patient = { address, date_of_brirh };
    return await this.prisma.patient.update({
      where: { id },
      data: patient,
    });
  }

  async findAppointmentByStatus(id: number, status: StatusAppointment) {
    return await this.prisma.patient.findUnique({
      where: {
        id,
      },
      include: {
        appointements: {
          where: {
            status: status,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.patient.delete({
      where: { id },
    });
  }
}
