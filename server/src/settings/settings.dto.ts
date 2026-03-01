import { IsString, IsOptional, IsArray, IsUrl, ValidateNested, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class SocialLinkDto {
  @IsString()
  @MaxLength(100)
  label: string;

  @IsString()
  @IsUrl({ require_tld: false })
  href: string;
}

export class UpdateSettingsDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkDto)
  socialLinks?: SocialLinkDto[];

  @IsOptional()
  @IsString()
  @MaxLength(500)
  contactSubtitle?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  contactEmail?: string | null;
}
