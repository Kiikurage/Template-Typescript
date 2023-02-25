import { FastifyInstance } from 'fastify';
import { createApp } from '../../app';
import { uuid } from '../../lib/uuid';
import { User } from '../../model/User';
import { CreateUserRequest, UserService } from '../../service/UserService';
import { MemoryUserStorage } from '../../storage/memory/MemoryUserStorage';

describe('userRoute', () => {
    const PORT = 33333;
    let userService: UserService;
    let app: FastifyInstance;

    beforeEach(async () => {
        userService = new UserService(new MemoryUserStorage());
        app = createApp(userService);
        await app.listen({ port: PORT });
    });

    afterEach(() => {
        app.close();
    });

    describe('GET /v1/user/:userId', () => {
        it('should return the user', async () => {
            const user: User = await userService.create({ name: 'Kikurage' });

            const res = await fetch(`http://localhost:${PORT}/v1/user/${user.id}`);
            const replyUser = await res.json();

            expect(replyUser).toEqual(user);
        });

        it("should return 404 when requested user doesn't exist", async () => {
            const res = await fetch(`http://localhost:${PORT}/v1/user/${uuid()}`);

            expect(res.status).toEqual(404);
        });
    });

    describe('GET /v1/user', () => {
        it('result should be paginated as default', async () => {
            const users = await Promise.all(
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) =>
                    userService.create({ name: `user${i}` })
                )
            );

            const res = await fetch(`http://localhost:${PORT}/v1/user`);

            expect(await res.json()).toEqual({
                items: users.slice(0, 10),
                offset: 0,
                total: 20,
            });
        });

        it('parameter "offset" works expectedly', async () => {
            const users = await Promise.all(
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) =>
                    userService.create({ name: `user${i}` })
                )
            );

            const res = await fetch(`http://localhost:${PORT}/v1/user?offset=5`);

            expect(await res.json()).toEqual({
                items: users.slice(5, 15),
                offset: 5,
                total: 20,
            });
        });

        it('parameter "size" works expectedly', async () => {
            const users = await Promise.all(
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) =>
                    userService.create({ name: `user${i}` })
                )
            );

            const res = await fetch(`http://localhost:${PORT}/v1/user?size=7`);

            expect(await res.json()).toEqual({
                items: users.slice(0, 7),
                offset: 0,
                total: 20,
            });
        });

        it('parameter "offset" and "size" can be used at the same time', async () => {
            const users = await Promise.all(
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) =>
                    userService.create({ name: `user${i}` })
                )
            );

            const res = await fetch(`http://localhost:${PORT}/v1/user?offset=5&size=7`);

            expect(await res.json()).toEqual({
                items: users.slice(5, 5 + 7),
                offset: 5,
                total: 20,
            });
        });
    });

    describe('POST /v1/user', () => {
        it('should return the created user', async () => {
            const res = await fetch(`http://localhost:${PORT}/v1/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'Kikurage',
                } satisfies CreateUserRequest),
            });
            const replyUser = await res.json();

            expect(replyUser.name).toEqual('Kikurage');
        });

        it('creating users with same names should be allowed', async () => {
            const request: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'Kikurage',
                } satisfies CreateUserRequest),
            };
            const res1 = await fetch(`http://localhost:${PORT}/v1/user`, request);
            const replyUser1 = await res1.json();
            const res2 = await fetch(`http://localhost:${PORT}/v1/user`, request);
            const replyUser2 = await res2.json();

            expect(replyUser1.name).toEqual('Kikurage');
            expect(replyUser2.name).toEqual('Kikurage');
            expect(replyUser1.id).not.toBe(replyUser2.id);
        });
    });

    describe('DELETE /v1/user/:userId', () => {
        it('should delete the user', async () => {
            const user: User = await userService.create({ name: 'Kikurage' });

            expect(await userService.getById(user.id)).not.toBe(null);

            await fetch(`http://localhost:${PORT}/v1/user/${user.id}`, {
                method: 'DELETE',
            });

            expect(await userService.getById(user.id)).toBe(null);
        });

        it("if requested user doesn't exist, nothing happens", async () => {
            const userId = uuid();
            expect(await userService.getById(userId)).toBe(null);

            const res = await fetch(`http://localhost:${PORT}/v1/user/${userId}`, {
                method: 'DELETE',
            });

            expect(res.status).toBe(200);
            expect(await userService.getById(userId)).toBe(null);
        });
    });
});
