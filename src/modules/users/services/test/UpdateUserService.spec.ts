import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from '../CreateUserService';
import UpdateUserService from '../UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;
let updateUserService: UpdateUserService;
let hashProvider: FakeHashProvider;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      hashProvider,
    );
    updateUserService = new UpdateUserService(
      fakeUsersRepository,
      hashProvider,
    );
  });

  it('should be able to update user name and email', async () => {
    const user = await createUserService.execute({
      name: 'Renato Diniz',
      email: 'teste@email.com',
      password: '123456',
    });

    const userUpdate = await updateUserService.execute({
      user_id: user.id,
      name: 'Renato',
      email: 'email@email.com',
    });

    expect(userUpdate.name).toBe('Renato');
    expect(userUpdate.email).toBe('email@email.com');
  });

  it('should be able to update user with valid id', async () => {
    expect(
      updateUserService.execute({
        user_id: '3212312131',
        name: 'Renato',
        email: 'email@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update user password', async () => {
    const user = await createUserService.execute({
      name: 'Renato Diniz',
      email: 'email@email.com',
      password: '123456',
    });

    const userUpdate = await updateUserService.execute({
      user_id: user.id,
      name: 'Renato Diniz',
      email: 'email@email.com',
      password: '258741',
      old_password: '123456',
    });

    expect(userUpdate.id).toBe(user.id);
  });

  it('should not be able to update user email if already in use', async () => {
    await createUserService.execute({
      name: 'Renato Diniz',
      email: 'teste@email.com',
      password: '123456',
    });
    const user = await createUserService.execute({
      name: 'Renato Diniz',
      email: 'email@email.com',
      password: '123456',
    });

    expect(
      updateUserService.execute({
        user_id: user.id,
        name: 'Renato Diniz',
        email: 'teste@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user password without old password', async () => {
    const user = await createUserService.execute({
      name: 'Renato Diniz',
      email: 'email@email.com',
      password: '123456',
    });

    expect(
      updateUserService.execute({
        user_id: user.id,
        name: 'Renato Diniz',
        email: 'email@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user password if old password does not match', async () => {
    const user = await createUserService.execute({
      name: 'Renato Diniz',
      email: 'email@email.com',
      password: '123456',
    });

    expect(
      updateUserService.execute({
        user_id: user.id,
        name: 'Renato Diniz',
        email: 'email@email.com',
        password: '654321',
        old_password: '258741',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should not be able to create two users with the same email', async () => {
  //   await createUserService.execute({
  //     name: 'Renato Diniz',
  //     email: 'teste@email.com',
  //     password: '123456',
  //   });

  //   expect(
  //     createUserService.execute({
  //       name: 'Renato Diniz',
  //       email: 'teste@email.com',
  //       password: '123456',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
