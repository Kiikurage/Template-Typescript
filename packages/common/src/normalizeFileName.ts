export function normalizeFileName(name: string): string {
	return name.replace(/[/. ]/g, "_").replace(/#/g, "＃").replace(/\?/g, "？");
}
