import { IsString, Length, MinLength, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(1, { message: 'Identifiant requis.' })
  username: string;

  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  password: string;
}

export class RequestOtpDto {
  @IsEmail()
  email: string;
}

export class VerifyOtpDto {
  @IsString()
  @MinLength(1)
  token: string;

  @IsString()
  @Length(6, 6)
  code: string;
}
