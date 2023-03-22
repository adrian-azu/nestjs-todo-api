import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    try {
      createTodoDto.userId = req.user.userId;
      return { id: await this.todosService.create(createTodoDto) };
    } catch (error) {
      throw new HttpException('Failed to create todo', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Request() req) {
    try {
      return await this.todosService.findAll(req.user.userId);
    } catch (error) {
      throw new HttpException('Failed to fetch todos', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const todo = await this.todosService.findOne(id);
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    if (todo.userId !== req.user.userId) {
      throw new HttpException('Unauthorized todo', HttpStatus.UNAUTHORIZED);
    }
    return todo;
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const todo = await this.todosService.update(id, updateTodoDto);
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    if (todo.userId !== req.user.userId) {
      throw new HttpException('Unauthorized todo', HttpStatus.UNAUTHORIZED);
    }
    return todo;
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const isDeleted = await this.todosService.remove(id, req.user.userId);
    if (!isDeleted) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Todo successfully deleted' };
  }
}
