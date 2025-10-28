import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobQueryDto } from './dto/job-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JobStatus, Prisma } from '@prisma/client';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateJobDto) {
    return this.prisma.job.create({
      data,
    });
  }

  async findAll(query: JobQueryDto) {
    const { search, type, page = 1, limit = 5 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.JobWhereInput = {
      status: JobStatus.ACTIVE,
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { skills: { hasSome: [search] } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (type) {
      where.type = type;
    }

    const [jobs, total] = await Promise.all([
      this.prisma.job.findMany({
        include: {
          company: {
            select: {
              name: true,
            },
          },
        },
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.job.count({ where }),
    ]);

    return {
      jobs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.job.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateJobDto) {
    return this.prisma.job.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.job.delete({
      where: { id },
    });
  }
}
