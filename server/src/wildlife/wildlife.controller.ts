import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { WildlifeService } from './wildlife.service';
import {
  CreateWildlifePhotoDto,
  UpdateWildlifePhotoDto,
  CreateWildlifeVideoDto,
  UpdateWildlifeVideoDto,
} from './wildlife.dto';
import { AdminGuard } from '../auth/admin.guard';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'wildlife');
const API_URL = process.env.API_URL || 'http://localhost:3001';

const storage = diskStorage({
  destination: (_req, _file, cb) => {
    const fs = require('fs');
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
    cb(null, name);
  },
});

@Controller('wildlife')
@UseGuards(AdminGuard)
export class WildlifeController {
  constructor(private readonly wildlifeService: WildlifeService) {}

  @Get('photos')
  getPhotos() {
    return this.wildlifeService.findAllPhotos();
  }

  @Post('photos/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new BadRequestException('Seules les images sont acceptées.'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Aucun fichier envoyé.');
    const url = `${API_URL}/uploads/wildlife/${file.filename}`;
    return { url };
  }

  @Post('photos')
  createPhoto(@Body() dto: CreateWildlifePhotoDto) {
    return this.wildlifeService.createPhoto(dto);
  }

  @Get('photos/:id')
  getPhoto(@Param('id') id: string) {
    return this.wildlifeService.findPhoto(id);
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
