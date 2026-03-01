import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { DesignService } from './design.service';
import { CreateDesignDto, UpdateDesignDto } from './design.dto';
import { AdminGuard } from '../auth/admin.guard';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'designs');
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

@Controller('designs')
@UseGuards(AdminGuard)
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    return this.designService.findAll(category);
  }

  @Post('upload')
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
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Aucun fichier envoyé.');
    const url = `${API_URL}/uploads/designs/${file.filename}`;
    return { url };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.designService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDesignDto) {
    return this.designService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDesignDto) {
    return this.designService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.designService.remove(id);
  }
}
