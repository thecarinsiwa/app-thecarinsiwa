import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('wildlife_photos')
export class WildlifePhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'varchar', length: 2000 })
  imageUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  caption: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
