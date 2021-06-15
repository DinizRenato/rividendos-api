import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { container } from 'tsyringe';

import '@modules/users/providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
