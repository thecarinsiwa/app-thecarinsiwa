import { Entity, PrimaryColumn, Column } from 'typeorm';

export interface SocialLink {
  label: string;
  href: string;
}

@Entity('site_settings')
export class SiteSettings {
  @PrimaryColumn({ default: 'main' })
  id: string;

  @Column('simple-json')
  socialLinks: SocialLink[];

  @Column({ type: 'varchar', length: 500, nullable: true })
  contactSubtitle: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contactEmail: string | null;
}
