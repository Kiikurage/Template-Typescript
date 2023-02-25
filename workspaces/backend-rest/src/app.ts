import fastify from 'fastify';
import { userRoute } from './routes/v1/userRoute';
import { UserService } from './service/UserService';

export function createApp(userService: UserService) {
    const app = fastify({ logger: true });

    app.register(userRoute(userService), { prefix: '/v1' });

    return app;
}
