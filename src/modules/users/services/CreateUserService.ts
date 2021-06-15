import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email já cadastrado');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
