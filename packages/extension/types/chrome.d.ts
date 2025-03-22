namespace chrome {
	namespace events {
		interface Event<T extends unknown[]> {
			addListener(callback: (...args: T) => void): void;
		}
	}

	namespace runtime {
		function reload(): void;
	}

	namespace action {
		function setBadgeText(details: {
			tabId?: number;
			text?: string;
		}): Promise<void>;

		function setBadgeBackgroundColor(details: {
			tabId?: number;
			color: string | ColorArray;
		});

		declare const onClicked: chrome.events.Event<[tab: chrome.tabs.Tab]>;
	}

	namespace tabs {
		interface Tab {
			active: boolean;
			id?: number;
			url?: string;
		}

		type TabStatus = "unloaded" | "loading" | "complete";

		function get(tabId: number): Promise<Tab>;
		function query(query: {}): Promise<Tab[]>;

		declare const onActivated: chrome.events.Event<
			[activeInfo: { tabId: number; windowId: number }]
		>;
		declare const onCreated: chrome.events.Event<[tab: Tab]>;
		declare const onUpdated: chrome.events.Event<
			[
				tabId: number,
				changeInfo: {
					url?: string;
					status?: TabStatus;
				},
				tab: Tab,
			]
		>;
		declare const onRemoved: chrome.events.Event<
			[tabId: number, removeInfo: {}]
		>;
	}

	type ColorArray = [r: number, g: number, b: number, a: number];
}
