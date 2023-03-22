import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];
  async findUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
  async createUser(user: CreateUserDto): Promise<any> {
    const userId = Math.random();
    const saltRound = 10;
    const { password, ...result } = user;
    user.password = await bcrypt.hash(password, saltRound);

    const existingUser = await this.findUser(user.username);
    if (existingUser) {
      throw new Error('Username already exists!');
    }
    this.users.push({
      id: userId,
      ...user,
    });
    return { id: userId, ...result };
  }
}
