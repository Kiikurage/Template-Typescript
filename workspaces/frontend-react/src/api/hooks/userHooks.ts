import { PaginationRequest } from 'backend-rest/src/model/PaginationRequest';
import { CreateUserRequest } from 'backend-rest/src/service/UserService';
import useSWR, { useSWRConfig } from 'swr';
import { API } from '../API';

function getUserKey(userId: string) {
    return ['getUserById', userId];
}

function getUsersListKey(pagination: PaginationRequest) {
    return ['getUsersList', pagination];
}

export function useUser(userId: string) {
    return useSWR(getUserKey(userId), () => {
        return API.getUserById(userId);
    });
}

export function useUsersList(pagination: PaginationRequest) {
    return useSWR(getUsersListKey(pagination), () => {
        return API.getUsersList(pagination);
    });
}

export function useCreateUser() {
    const { mutate } = useSWRConfig();

    return async (createUserRequest: CreateUserRequest) => {
        const user = await API.createUser(createUserRequest);

        mutate(getUserKey(user.id));
        mutate((key) => Array.isArray(key) && key[0] === 'getUsersList');

        return user;
    };
}

export function useDeleteUser() {
    const { mutate } = useSWRConfig();

    return async (userId: string) => {
        await API.deleteUser(userId);

        mutate(getUserKey(userId));
        mutate((key) => Array.isArray(key) && key[0] === 'getUsersList');
    };
}
