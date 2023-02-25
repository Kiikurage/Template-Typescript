import { FastifyPluginCallback } from 'fastify';
import { PaginationResponse } from '../../model/PaginationResponse';
import { User } from '../../model/User';
import { CreateUserRequest, UserService } from '../../service/UserService';

export function userRoute(userService: UserService): FastifyPluginCallback {
    return (fastify, options, done) => {
        fastify.get<{
            Params: {
                userId: string;
            };
            Reply: User;
        }>('/user/:userId', async (request, reply) => {
            const { userId } = request.params;
            const user = await userService.getById(userId);

            if (user === null) {
                reply.status(404);
            } else {
                reply.status(200).send(user);
            }
        });

        fastify.get<{
            Querystring: {
                offset?: string;
                size?: string;
            };
            Reply: PaginationResponse<User>;
        }>('/user', async (request, reply) => {
            const { offset: offsetStr, size: sizeStr } = request.query;
            const users = await userService.getList({
                offset: offsetStr === undefined ? undefined : Number(offsetStr),
                size: sizeStr === undefined ? undefined : Number(sizeStr),
            });

            reply.status(200).send(users);
        });

        fastify.post<{
            Body: CreateUserRequest;
            Reply: User;
        }>('/user', async (request, reply) => {
            const createUserRequest = request.body;
            const user = await userService.create(createUserRequest);

            reply.status(200).send(user);
        });

        fastify.delete<{
            Params: {
                userId: string;
            };
            Reply: never;
        }>('/user/:userId', async (request, reply) => {
            const { userId } = request.params;
            await userService.delete(userId);

            reply.status(200).send({});
        });

        done();
    };
}
