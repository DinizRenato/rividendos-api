import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import GetUserByEmailService from '../GetUserByEmailService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;
let getUserByEmailService: GetUserByEmailService;
let hashProvider: FakeHashProvider;

describe('GetUserByEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    getUserByEmailService = new GetUserByEmailService(fakeUsersRepository);
    createUserService = new CreateUserService(
      fakeUsersRepository,
      hashProvider,
    );
  });

  it('should be able to get user by email', async () => {
    const user = await createUserService.execute({
      name: 'Renato Diniz',
      email: 'teste@email.com',
      password: '123456',
    });

    const email = user.email;

    const result = await getUserByEmailService.execute({ email });

    expect(result).toBe(user);
  });

  it('should be able to get error user not found', async () => {
    const email = 'abc@email.com';
    expect(getUserByEmailService.execute({ email })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
