import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  async create(createTodoDto: CreateTodoDto) {
    createTodoDto.id = Math.random();
    console.log(createTodoDto);
    this.todos.push(createTodoDto);
    return createTodoDto.id;
  }

  async findAll(userId: number) {
    return this.todos.filter((todo) => todo.userId === userId);
  }

  async findOne(id: number): Promise<Todo> {
    return this.todos.find((todo) => todo.id === id);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index < 0) {
      return null;
    }
    this.todos[index] = { ...this.todos[index], ...updateTodoDto };
    return this.todos[index];
  }

  async remove(id: number, userId: number) {
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
