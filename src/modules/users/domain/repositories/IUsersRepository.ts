import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  findAll(): Promise<IUser[]>;
  findByName(name: string): Promise<IUser>;
  findById(id: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  create(data: ICreateUser): Promise<IUser>;
  save(data: IUser): Promise<IUser>;
}
