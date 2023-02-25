import { PaginationRequest } from 'backend-rest/src/model/PaginationRequest';
import { PaginationResponse } from 'backend-rest/src/model/PaginationResponse';
import { User } from 'backend-rest/src/model/User';
import { CreateUserRequest } from 'backend-rest/src/service/UserService';

export function createUserAPI(host: string) {
    const prefix = `${host}/v1/user`;

    async function getUserById(userId: string): Promise<User | null> {
        const res = await fetch(`${prefix}/${userId}`);
        if (res.status === 404) return null;

        return await res.json();
    }

    async function getUsersList(request: PaginationRequest = {}): Promise<PaginationResponse<User>> {
        const q = new URLSearchParams();
        if (request.size !== undefined) q.append('size', request.size.toString());
        if (request.offset !== undefined) q.append('offset', request.offset.toString());

        const res = await fetch(`${prefix}?${q.toString()}`);
        return await res.json();
    }

    async function createUser(request: CreateUserRequest): Promise<User> {
        const res = await fetch(`${prefix}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        return await res.json();
    }

    async function deleteUser(userId: string): Promise<void> {
        await fetch(`${prefix}/${userId}`, {
            method: 'DELETE',
        });
    }

    return {
        getUserById,
        getUsersList,
        createUser,
        deleteUser,
    };
}
