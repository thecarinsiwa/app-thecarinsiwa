import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(getRepositoryToken(Project))
    private readonly repo: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findFeatured(): Promise<Project[]> {
    return this.repo.find({
      where: { featured: true },
      order: { createdAt: 'DESC' },
      take: 3,
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.repo.findOne({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const project = this.repo.create(dto);
    return this.repo.save(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    Object.assign(project, dto);
    return this.repo.save(project);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.repo.remove(project);
  }
}
