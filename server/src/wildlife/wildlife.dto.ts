import { IsString, IsOptional, IsUrl, MinLength } from 'class-validator';

export class CreateWildlifePhotoDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsString()
  caption?: string | null;
}

export class UpdateWildlifePhotoDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  caption?: string | null;
}

export class CreateWildlifeVideoDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @IsUrl()
  embedUrl: string;

  @IsOptional()
  @IsUrl()
  thumbnailUrl?: string | null;
}

export class UpdateWildlifeVideoDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsUrl()
  embedUrl?: string;

  @IsOptional()
  @IsUrl()
  thumbnailUrl?: string | null;
}
