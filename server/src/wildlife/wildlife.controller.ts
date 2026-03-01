import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { WildlifeService } from './wildlife.service';
import {
  CreateWildlifePhotoDto,
  UpdateWildlifePhotoDto,
  CreateWildlifeVideoDto,
  UpdateWildlifeVideoDto,
} from './wildlife.dto';

@Controller('wildlife')
export class WildlifeController {
  constructor(private readonly wildlifeService: WildlifeService) {}

  @Get('photos')
  getPhotos() {
    return this.wildlifeService.findAllPhotos();
  }

  @Get('photos/:id')
  getPhoto(@Param('id') id: string) {
    return this.wildlifeService.findPhoto(id);
  }

  @Post('photos')
  createPhoto(@Body() dto: CreateWildlifePhotoDto) {
    return this.wildlifeService.createPhoto(dto);
  }

  @Patch('photos/:id')
  updatePhoto(@Param('id') id: string, @Body() dto: UpdateWildlifePhotoDto) {
    return this.wildlifeService.updatePhoto(id, dto);
  }

  @Delete('photos/:id')
  removePhoto(@Param('id') id: string) {
    return this.wildlifeService.removePhoto(id);
  }

  @Get('videos')
  getVideos() {
    return this.wildlifeService.findAllVideos();
  }

  @Get('videos/:id')
  getVideo(@Param('id') id: string) {
    return this.wildlifeService.findVideo(id);
  }

  @Post('videos')
  createVideo(@Body() dto: CreateWildlifeVideoDto) {
    return this.wildlifeService.createVideo(dto);
  }

  @Patch('videos/:id')
  updateVideo(@Param('id') id: string, @Body() dto: UpdateWildlifeVideoDto) {
    return this.wildlifeService.updateVideo(id, dto);
  }

  @Delete('videos/:id')
  removeVideo(@Param('id') id: string) {
    return this.wildlifeService.removeVideo(id);
  }
}
