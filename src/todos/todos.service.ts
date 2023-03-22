import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  async create(createTodoDto: CreateTodoDto) {
    createTodoDto.id = uuid();
    console.log(createTodoDto);
    this.todos.push(createTodoDto);
    return createTodoDto.id;
  }

  async findAll(userId: string) {
    return this.todos.filter((todo) => todo.userId === userId);
  }

  async findOne(id: string): Promise<Todo> {
    return this.todos.find((todo) => todo.id === id);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index < 0) {
      return null;
    }
    this.todos[index] = { ...this.todos[index], ...updateTodoDto };
    return this.todos[index];
  }

  async remove(id: string, userId: string) {
    const index = this.todos.findIndex(
      (todo) => todo.id === id && todo.userId === userId,
    );
    if (index < 0) {
      return null;
    }
    this.todos.splice(index);
    return true;
  }
}
