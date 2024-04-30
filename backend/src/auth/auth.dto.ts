/* istanbul ignore file */
import { IsInt, IsString, Length } from 'class-validator';

export class AuthDTO {
  @IsString()
  @Length(42, 42)
  wallet: string;

  @IsString()
  @Length(1)
  secret: string;

  @IsInt()
  timestamp: number;
}
