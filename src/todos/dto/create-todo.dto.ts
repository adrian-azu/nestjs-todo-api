import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateTodoDto {
  @IsInt()
  id: number;

  @IsInt()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  is_done: boolean;
}
