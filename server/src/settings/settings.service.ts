import { Injectable, Inject } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSettings } from './settings.entity';
import { UpdateSettingsDto } from './settings.dto';

const DEFAULT_ID = 'main';

@Injectable()
export class SettingsService {
  constructor(
    @Inject(getRepositoryToken(SiteSettings))
    private readonly repo: Repository<SiteSettings>,
  ) {}

  async find(): Promise<SiteSettings> {
    let settings = await this.repo.findOne({ where: { id: DEFAULT_ID } });
    if (!settings) {
      settings = this.repo.create({
        id: DEFAULT_ID,
        socialLinks: [],
        contactSubtitle: null,
        contactEmail: null,
      });
      await this.repo.save(settings);
    }
    return settings;
  }

  async update(dto: UpdateSettingsDto): Promise<SiteSettings> {
    let settings = await this.repo.findOne({ where: { id: DEFAULT_ID } });
    if (!settings) {
      settings = this.repo.create({
        id: DEFAULT_ID,
        socialLinks: dto.socialLinks ?? [],
        contactSubtitle: dto.contactSubtitle ?? null,
        contactEmail: dto.contactEmail ?? null,
      });
    } else {
      if (dto.socialLinks !== undefined) settings.socialLinks = dto.socialLinks;
      if (dto.contactSubtitle !== undefined) settings.contactSubtitle = dto.contactSubtitle;
      if (dto.contactEmail !== undefined) settings.contactEmail = dto.contactEmail;
    }
    return this.repo.save(settings);
  }
}
