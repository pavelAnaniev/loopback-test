// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import { repository, Filter } from '@loopback/repository';
import { post, get, param, requestBody, getFilterSchemaFor } from '@loopback/rest';
import { TodoListRepository } from '../repositories';
import { Todo, TodoList } from '../models';

export class TodoListTodoController {
  constructor(
    @repository(TodoListRepository) protected todoListRepo: TodoListRepository,
  ) { }
  @post('/todo-lists/{id}/todos')
  async create(@param.path.number('id') id: number, @requestBody() todo: Todo) {
    return await this.todoListRepo.todos(id).create(todo);
  }

  @get('/todo-lists/{id}/todos', {
    responses: {
      '200': {
        description: "Array of Todo's belonging to TodoList",
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Todo } },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.string('filter') filter?: Filter,
  ): Promise<Todo[]> {
    return await this.todoListRepo.todos(id).find(filter);
  }

  // @get('/todo-lists', {
  //   responses: {
  //     '200': {
  //       description: 'Array of TodoList model instances',
  //       content: { 'application/json': { schema: { 'x-ts-type': TodoList } } },
  //     },
  //   },
  // })
  // async find(
  //   @param.query.object('filter', getFilterSchemaFor(TodoList)) filter?: Filter,
  // ): Promise<TodoList[]> {
  //   return await this.todoListRepo.find(filter);
  // }
}
