import { PaginationRequest } from '../../model/PaginationRequest';
import { PaginationResponse } from '../../model/PaginationResponse';
import { User } from '../../model/User';
import { UserStorage } from '../UserStorage';

export class MemoryUserStorage implements UserStorage {
    private readonly memoryUsers = new Map<string, MemoryUser>();

    async getById(userId: string): Promise<User | null> {
        const memoryUser = this.memoryUsers.get(userId);
        if (memoryUser === undefined) return null;

        return MemoryUser.toUser(memoryUser);
    }

    async getList(pagination: PaginationRequest): Promise<PaginationResponse<User>> {
        const { offset = 0, size = 10 } = pagination;
        const memoryUsers = [...this.memoryUsers.values()];
        return {
            items: memoryUsers.slice(offset, offset + size),
            offset,
            total: memoryUsers.length,
        };
    }

    async save(user: User): Promise<void> {
        this.memoryUsers.set(user.id, MemoryUser.fromUser(user));
    }

    async delete(userId: string): Promise<void> {
        this.memoryUsers.delete(userId);
    }
}

interface MemoryUser {
    id: string;
    name: string;
}

module MemoryUser {
    export function toUser(memoryUser: MemoryUser): User {
        return memoryUser;
    }

    export function fromUser(user: User): MemoryUser {
        return user;
    }
}
