import { IsInt, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class CreateUserDto {
  @IsUUID()
  id: string;

  @IsInt()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z]).{8,}$/, {
    message: 'Password Must have one Capital letter and at least 8 characters',
  })
  password: string;
}
