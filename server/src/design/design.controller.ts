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
} from '@nestjs/common';
import { DesignService } from './design.service';
import { CreateDesignDto, UpdateDesignDto } from './design.dto';
import { AdminGuard } from '../auth/admin.guard';

@Controller('designs')
@UseGuards(AdminGuard)
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    return this.designService.findAll(category);
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
