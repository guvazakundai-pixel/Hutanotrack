import { IsString, IsNotEmpty, IsOptional, MinLength, IsEnum } from 'class-validator';
import { UserRole, Language } from '@hutanotrack/shared';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEnum(UserRole)
  role!: UserRole;

  @IsEnum(Language)
  @IsOptional()
  preferredLanguage?: Language;
}
