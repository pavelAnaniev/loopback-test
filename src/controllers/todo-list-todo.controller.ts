// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import { repository } from '@loopback/repository';
import { post, param, requestBody } from '@loopback/rest';
import { TodoListRepository } from '../repositories';
import { Todo } from '../models';

export class TodoListTodoController {
  constructor(
    @repository(TodoListRepository) protected todoListRepo: TodoListRepository,
  ) { }
  @post('/todo-lists/{id}/todos')
  async create(@param.path.number('id') id: number, @requestBody() todo: Todo) {
    return await this.todoListRepo.todos(id).create(todo);
  }
}
