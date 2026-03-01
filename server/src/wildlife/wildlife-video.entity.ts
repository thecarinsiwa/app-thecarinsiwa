import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('wildlife_videos')
export class WildlifeVideo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'varchar', length: 2000 })
  embedUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnailUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
