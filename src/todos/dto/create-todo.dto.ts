import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateTodoDto {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  is_done: boolean;
}
