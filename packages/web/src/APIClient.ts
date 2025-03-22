import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { APIRouter } from "@app/server/src/APIRouter";

export const APIClient = createTRPCProxyClient<APIRouter>({
	links: [
		httpBatchLink({
			url: "/api",
		}),
	],
});
