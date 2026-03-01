import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WildlifePhoto } from './wildlife-photo.entity';
import { WildlifeVideo } from './wildlife-video.entity';
import {
  CreateWildlifePhotoDto,
  UpdateWildlifePhotoDto,
  CreateWildlifeVideoDto,
  UpdateWildlifeVideoDto,
} from './wildlife.dto';

@Injectable()
export class WildlifeService {
  constructor(
    @Inject(getRepositoryToken(WildlifePhoto))
    private readonly photoRepo: Repository<WildlifePhoto>,
    @Inject(getRepositoryToken(WildlifeVideo))
    private readonly videoRepo: Repository<WildlifeVideo>,
  ) {}

  async findAllPhotos(): Promise<WildlifePhoto[]> {
    return this.photoRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findPhoto(id: string): Promise<WildlifePhoto> {
    const photo = await this.photoRepo.findOne({ where: { id } });
    if (!photo) throw new NotFoundException('Photo not found');
    return photo;
  }

  async createPhoto(dto: CreateWildlifePhotoDto): Promise<WildlifePhoto> {
    const photo = this.photoRepo.create(dto);
    return this.photoRepo.save(photo);
  }

  async updatePhoto(id: string, dto: UpdateWildlifePhotoDto): Promise<WildlifePhoto> {
    const photo = await this.findPhoto(id);
    Object.assign(photo, dto);
    return this.photoRepo.save(photo);
  }

  async removePhoto(id: string): Promise<void> {
    const photo = await this.findPhoto(id);
    await this.photoRepo.remove(photo);
  }

  async findAllVideos(): Promise<WildlifeVideo[]> {
    return this.videoRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findVideo(id: string): Promise<WildlifeVideo> {
    const video = await this.videoRepo.findOne({ where: { id } });
    if (!video) throw new NotFoundException('Video not found');
    return video;
  }

  async createVideo(dto: CreateWildlifeVideoDto): Promise<WildlifeVideo> {
    const video = this.videoRepo.create(dto);
    return this.videoRepo.save(video);
  }

  async updateVideo(id: string, dto: UpdateWildlifeVideoDto): Promise<WildlifeVideo> {
    const video = await this.findVideo(id);
    Object.assign(video, dto);
    return this.videoRepo.save(video);
  }

  async removeVideo(id: string): Promise<void> {
    const video = await this.findVideo(id);
    await this.videoRepo.remove(video);
  }
}
