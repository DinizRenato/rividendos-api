import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import GetUserByIdService from '../GetUserByIdService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;
let getUserByIdService: GetUserByIdService;
let hashProvider: FakeHashProvider;

describe('GetUserById', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    getUserByIdService = new GetUserByIdService(fakeUsersRepository);
    createUserService = new CreateUserService(
      fakeUsersRepository,
      hashProvider,
    );
  });

  it('should be able to get user by id', async () => {
    const user = await createUserService.execute({
      name: 'Renato Diniz',
      email: 'teste@email.com',
      password: '123456',
    });

    const id = user.id;

    const result = await getUserByIdService.execute({ id });

    expect(result).toBe(user);
  });

  it('should be able to get error user not found', async () => {
    const id = 'kwhskdksjvfakjhkahkre';
    expect(getUserByIdService.execute({ id })).rejects.toBeInstanceOf(AppError);
  });
});
