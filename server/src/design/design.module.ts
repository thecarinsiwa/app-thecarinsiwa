import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Design } from './design.entity';
import { DesignController } from './design.controller';
import { DesignService } from './design.service';

@Module({
  imports: [TypeOrmModule.forFeature([Design])],
  controllers: [DesignController],
  providers: [DesignService],
})
export class DesignModule {}
