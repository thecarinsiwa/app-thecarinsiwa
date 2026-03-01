import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './settings.dto';
import { AdminGuard } from '../auth/admin.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  find() {
    return this.settingsService.find();
  }

  @Patch()
  @UseGuards(AdminGuard)
  update(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.update(dto);
  }
}
