import { IsString, IsOptional, IsIn, IsUrl, MinLength } from 'class-validator';

const CATEGORIES = ['Branding', 'Social Media', 'Print', 'UI'] as const;

export class CreateDesignDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsIn([...CATEGORIES])
  category: (typeof CATEGORIES)[number];
}

export class UpdateDesignDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @IsIn([...CATEGORIES])
  category?: (typeof CATEGORIES)[number];
}
