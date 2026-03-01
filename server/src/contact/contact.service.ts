import { Injectable, Inject } from '@nestjs/common';
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
}
