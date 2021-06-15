import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IGetUserById } from '../domain/models/IGetUserById';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

@injectable()
class GetUserByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IGetUserById): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    return user;
  }
}

export default GetUserByIdService;
