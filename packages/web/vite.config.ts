import * as path from "node:path";
import type { UserConfig } from "vite";
import checker from "vite-plugin-checker";

export default {
	root: path.resolve(__dirname, "./src"),
	mode: process.env.NODE_ENV ?? "development",
	build: {
		outDir: path.resolve(__dirname, "./build"),
	},
	plugins: [
		checker({
			typescript: true,
		}),
	],
} satisfies UserConfig;
