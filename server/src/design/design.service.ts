import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Design } from './design.entity';
import { CreateDesignDto, UpdateDesignDto } from './design.dto';

@Injectable()
export class DesignService {
  constructor(
    @Inject(getRepositoryToken(Design))
    private readonly repo: Repository<Design>,
  ) {}

  async findAll(category?: string): Promise<Design[]> {
    const qb = this.repo.createQueryBuilder('d').orderBy('d.createdAt', 'DESC');
    if (category && category !== 'All') {
      qb.andWhere('d.category = :category', { category });
    }
    return qb.getMany();
  }

  async findOne(id: string): Promise<Design> {
    const design = await this.repo.findOne({ where: { id } });
    if (!design) throw new NotFoundException('Design not found');
    return design;
  }

  async create(dto: CreateDesignDto): Promise<Design> {
    const design = this.repo.create(dto);
    return this.repo.save(design);
  }

  async update(id: string, dto: UpdateDesignDto): Promise<Design> {
    const design = await this.findOne(id);
    Object.assign(design, dto);
    return this.repo.save(design);
  }

  async remove(id: string): Promise<void> {
    const design = await this.findOne(id);
    await this.repo.remove(design);
  }
}
