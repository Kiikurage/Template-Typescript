import { getApp } from './dependency';

const app = getApp();

app.listen({ port: 3000 }).catch((e) => {
    app.log.error(e);
    process.exit(1);
});
