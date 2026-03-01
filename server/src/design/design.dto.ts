import { IsString, IsOptional, IsIn, MinLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

const CATEGORIES = ['Branding', 'Social Media', 'Print', 'UI'] as const;

// Accepte une URL complète (http/https) ou un chemin absolu (/...)
const URL_OR_PATH = /^(https?:\/\/[^\s]+|\/[^\s]*)$/;

export class CreateDesignDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(1, { message: 'Le titre est requis.' })
  title: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(1, { message: 'L’image est requise (choisir un fichier ou coller une URL).' })
  @Matches(URL_OR_PATH, { message: 'Indiquez une URL (https://...) ou un chemin d’image (/...).' })
  imageUrl: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsIn([...CATEGORIES], { message: 'Catégorie invalide.' })
  category: (typeof CATEGORIES)[number];
}

export class UpdateDesignDto {
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(1)
  @Matches(URL_OR_PATH, { message: 'Indiquez une URL (https://...) ou un chemin d’image (/...).' })
  imageUrl?: string;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsIn([...CATEGORIES])
  category?: (typeof CATEGORIES)[number];
}
