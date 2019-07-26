import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as morgan from 'morgan';
import { SSRRouter } from './routes/SSRRouter';

export class Server {
    private readonly app: express.Express;

    constructor() {
        this.app = express();

        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(express.static(__dirname + '/../static'));
        this.app.use(SSRRouter);

        this.app.use(function(_req: express.Request, _res: express.Response, next: express.NextFunction) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = Error('Not Found') as any;
            err.status = 404;
            next(err);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.app.use(function(err: any, res: express.Response) {
            console.log(err);
            res.status(err.status || 500);
            res.render('error', {
                message: err.title,
                error: {}
            });
        });
    }

    listen() {
        const port = process.env.PORT || '3000';

        this.app.set('port', port);
        const server = http.createServer(this.app);
        server.listen(port);
        server.on('listening', () => console.log(server.address()));
    }
}
