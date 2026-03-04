import { IsString, Length, MinLength, IsEmail } from 'class-validator';

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
