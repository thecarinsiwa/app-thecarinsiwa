import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WildlifePhoto } from './wildlife-photo.entity';
import { WildlifeVideo } from './wildlife-video.entity';
import { WildlifeController } from './wildlife.controller';
import { WildlifeService } from './wildlife.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WildlifePhoto, WildlifeVideo]),
  ],
  controllers: [WildlifeController],
  providers: [WildlifeService],
})
export class WildlifeModule {}
