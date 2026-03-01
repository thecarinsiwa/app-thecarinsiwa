import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from './contact/contact.module';
import { ProjectsModule } from './projects/projects.module';
import { WildlifeModule } from './wildlife/wildlife.module';
import { DesignModule } from './design/design.module';
import { AuthModule } from './auth/auth.module';
import { ContactMessage } from './contact/contact.entity';
import { SettingsModule } from './settings/settings.module';
import { Project } from './projects/project.entity';
import { WildlifePhoto } from './wildlife/wildlife-photo.entity';
import { WildlifeVideo } from './wildlife/wildlife-video.entity';
import { Design } from './design/design.entity';
import { AdminOtp } from './auth/entities/admin-otp.entity';
import { SiteSettings } from './settings/settings.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'carin_portfolio',
      entities: [ContactMessage, Project, WildlifePhoto, WildlifeVideo, Design, AdminOtp, SiteSettings],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    ContactModule,
    ProjectsModule,
    WildlifeModule,
    DesignModule,
    AuthModule,
    SettingsModule,
  ],
})
export class AppModule {}
