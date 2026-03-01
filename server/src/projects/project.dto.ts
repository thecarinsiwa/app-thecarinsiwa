import { IsString, IsOptional, IsBoolean, IsArray, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsUrl({ require_tld: false })
  imageUrl: string;

  @IsArray()
  @IsString({ each: true })
  techStack: string[];

  @IsOptional()
  @IsUrl({ require_tld: false })
  githubUrl?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  liveUrl?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStack?: string[];

  @IsOptional()
  @IsUrl({ require_tld: false })
  githubUrl?: string | null;

  @IsOptional()
  @IsUrl({ require_tld: false })
  liveUrl?: string | null;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
