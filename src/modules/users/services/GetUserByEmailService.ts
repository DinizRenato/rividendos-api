import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IGetUserByEmail } from '../domain/models/IGetUserByEmail';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

@injectable()
class GetUserByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email }: IGetUserByEmail): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    return user;
  }
}

export default GetUserByIdService;
