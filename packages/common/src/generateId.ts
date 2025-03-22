export function generateId() {
	return "YYYYMMDD_hhmmss_xxxx"
		.replace("YYYY", new Date().getFullYear().toString())
		.replace("MM", (new Date().getMonth() + 1).toString().padStart(2, "0"))
		.replace("DD", new Date().getDate().toString().padStart(2, "0"))
		.replace("hh", new Date().getHours().toString().padStart(2, "0"))
		.replace("mm", new Date().getMinutes().toString().padStart(2, "0"))
		.replace("ss", new Date().getSeconds().toString().padStart(2, "0"))
		.replace("xxxx", Math.random().toString(32).substring(2, 6));
}
