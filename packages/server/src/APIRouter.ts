import { z } from "zod";
import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const APIRouter = t.router({
    getUser: t.procedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .query(async (opts) => {
            return {
                id: opts.input.id,
                name: "John Doe",
            }
        }),
});

export type APIRouter = typeof APIRouter;
