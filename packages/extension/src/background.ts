import { APIClient } from "./APIClient";

(function () {
	const ev = new EventSource("http://localhost:45628");
	ev.addEventListener("reload", () => chrome.runtime.reload());
	ev.onerror = () => {
		ev.onerror = () => {};
		ev.close();
		setTimeout(arguments.callee, 1000);
	};
})();
console.log("BackgroundScript", performance.now());
APIClient.getUser
	.query({ id: Math.random().toString(36).substring(2) })
	.then((user) => console.log(user));
