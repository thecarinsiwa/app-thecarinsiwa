import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './contact.entity';
import { CreateContactDto } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @Inject(getRepositoryToken(ContactMessage))
    private readonly repo: Repository<ContactMessage>,
  ) {}

  async create(dto: CreateContactDto): Promise<ContactMessage> {
    const msg = this.repo.create(dto);
    return this.repo.save(msg);
  }

  async findAll(): Promise<ContactMessage[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<ContactMessage> {
    const msg = await this.repo.findOne({ where: { id } });
    if (!msg) throw new NotFoundException('Message not found');
    return msg;
  }

  async remove(id: string): Promise<void> {
    const msg = await this.findOne(id);
    await this.repo.remove(msg);
  }
}
