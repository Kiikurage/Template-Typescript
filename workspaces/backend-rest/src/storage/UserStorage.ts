import { PaginationRequest } from '../model/PaginationRequest';
import { PaginationResponse } from '../model/PaginationResponse';
import { User } from '../model/User';

export interface UserStorage {
    getById(userId: string): Promise<User | null>;

    getList(pagination: PaginationRequest): Promise<PaginationResponse<User>>;

    save(user: User): Promise<void>;

    delete(userId: string): Promise<void>;
}
