import bodyParser from "body-parser";
import express from "express";
import decorateWithWS from "express-ws";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { APIRouter } from "./APIRouter";
import cors from "cors";

export async function startServer() {
    const app = express();
    decorateWithWS(app);

    app.use(bodyParser.json());
    app.use(
        cors({
            origin: "*",
            optionsSuccessStatus: 200,
        }),
    );
    app.use(
        "/api",
        createExpressMiddleware({
            router: APIRouter,
        }),
    );
    app.listen(13348, () => {
        console.log("Server started on http://localhost:13348");
    });
}

startServer();
