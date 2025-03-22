import * as path from "node:path";
import type { Plugin, UserConfig } from "vite";
import checker from "vite-plugin-checker";
import * as http from "node:http";
import chokidar from "chokidar";

export default {
	root: path.resolve(__dirname, "./src"),
	publicDir: path.resolve(__dirname, "./public"),
	mode: process.env.NODE_ENV ?? "development",
	build: {
		outDir: path.resolve(__dirname, "./build"),
		rollupOptions: {
			input: {
				background: "./src/background.ts",
				contentScript: "./src/contentScript.ts",
			},
			output: {
				entryFileNames: "[name].js",
			},
		},
	},
	plugins: [
		checker({
			typescript: true,
		}),
		liveReload(),
	],
} satisfies UserConfig;

function liveReload(): Plugin {
	const reloadHandlers = new Set<() => void>();
	const server = http.createServer((req, res) => {
		res.writeHead(200, {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
		});

		res.write("data: connected\n\n");

		const handler = () => res.write("event: reload\ndata: reload\n\n");
		reloadHandlers.add(handler);
		req.on("close", () => reloadHandlers.delete(handler));
	});
	server.listen(45628);
	process.on("beforeExit", () => server.close());

	return {
		name: "vite-plugin-live-reload",
		configResolved(config) {
			function reload() {
				console.log("reload");
				for (const handler of reloadHandlers) {
					handler();
				}
			}

			chokidar
				.watch(config.build.outDir, { ignoreInitial: true })
				.on("change", reload);
		},
	};
}
