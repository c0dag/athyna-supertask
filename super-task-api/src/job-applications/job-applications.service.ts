import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationQueryDto } from './dto/application-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const { jobId, firstName, lastName, email, phone } = createApplicationDto;

    const existingCandidate = await this.prisma.candidate.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    const candidate =
      existingCandidate ||
      (await this.prisma.candidate.create({
        data: { firstName, lastName, email, phone },
      }));

    const application = await this.prisma.application.create({
      data: {
        jobId,
        candidateId: candidate.id,
      },
      include: {
        job: true,
        candidate: true,
      },
    });

    await this.prisma.job.update({
      where: { id: jobId },
      data: { isApplied: true },
    });

    return application;
  }

  async findAll(query: ApplicationQueryDto) {
    const { search, page = 1, limit = 5 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ApplicationWhereInput = {};

    if (search) {
      where.OR = [
        {
          candidate: {
            firstName: { contains: search, mode: 'insensitive' },
          },
        },
        {
          candidate: {
            lastName: { contains: search, mode: 'insensitive' },
          },
        },
        {
          candidate: {
            email: { contains: search, mode: 'insensitive' },
          },
        },
        {
          job: {
            title: { contains: search, mode: 'insensitive' },
          },
        },
      ];
    }

    const [applications, total] = await Promise.all([
      this.prisma.application.findMany({
        include: {
          job: {
            select: {
              id: true,
              title: true,
              createdAt: true,
              company: {
                select: {
                  name: true,
                },
              },
            },
          },
          candidate: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
        },
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.application.count({ where }),
    ]);

    return {
      applications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: string) {
    return this.prisma.application.findUnique({
      where: { id },
      select: {
        id: true,
        job: {
          select: {
            id: true,
            title: true,
          },
        },
        createdAt: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.application.delete({
      where: { id },
    });
  }
}
