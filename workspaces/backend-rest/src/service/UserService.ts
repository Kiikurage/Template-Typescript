import { uuid } from '../lib/uuid';
import { PaginationRequest } from '../model/PaginationRequest';
import { PaginationResponse } from '../model/PaginationResponse';
import { User } from '../model/User';
import { UserStorage } from '../storage/UserStorage';

export class UserService {
    constructor(private readonly userStorage: UserStorage) {}

    async getById(userId: string): Promise<User | null> {
        return this.userStorage.getById(userId);
    }

    async getList(pagination: PaginationRequest): Promise<PaginationResponse<User>> {
        return this.userStorage.getList(pagination);
    }

    async create(request: CreateUserRequest): Promise<User> {
        const user: User = { id: uuid(), name: request.name };
        await this.userStorage.save(user);
        return user;
    }

    async delete(userId: string): Promise<void> {
        await this.userStorage.delete(userId);
    }
}

export interface CreateUserRequest {
    name: string;
}
