import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;
let hashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      hashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const customer = await createUserService.execute({
      name: 'Renato Diniz',
      email: 'teste@email.com',
      password: '123456',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUserService.execute({
      name: 'Renato Diniz',
      email: 'teste@email.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'Renato Diniz',
        email: 'teste@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
