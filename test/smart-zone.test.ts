import assert from "node:assert/strict";
import test from "node:test";
import type {
	ExtensionAPI,
	ExtensionContext
} from "@earendil-works/pi-coding-agent";
import smartZoneExtension, { formatStatus } from "../extensions/smart-zone.ts";

type Handler = (event: unknown, ctx: ExtensionContext) => unknown;

const REFRESH_EVENTS = [
	"session_start",
	"turn_end",
	"model_select",
	"session_compact",
	"session_tree"
];

function createExtension() {
	const handlers = new Map<string, Handler>();
	smartZoneExtension({
		on(event: string, handler: Handler) {
			handlers.set(event, handler);
		}
	} as unknown as ExtensionAPI);
	return {
		fire(event: string, ctx: ExtensionContext) {
			const handler = handlers.get(event);
			assert.ok(handler, `no handler registered for ${event}`);
			return handler({}, ctx);
		},
		events: [...handlers.keys()]
	};
}

type Widget = { key: string; content?: string[]; options?: unknown };

function createContext(initialTokens: number | null, hasUI = true) {
	let tokens = initialTokens;
	let widget: Widget | undefined;
	const context = {
		hasUI,
		ui: {
			setWidget(key: string, content?: string[], options?: unknown) {
				widget = { key, content, options };
			}
		},
		getContextUsage: () => ({
			tokens,
			contextWindow: 200_000,
			percent: tokens === null ? null : tokens / 2_000
		})
	} as unknown as ExtensionContext;
	return {
		context,
		getWidget: () => widget,
		setTokens(next: number | null) {
			tokens = next;
		}
	};
}

test("formatStatus classifies token counts at each threshold boundary", () => {
	const cases: [number | null | undefined, string][] = [
		[0, "SMART ZONE · 0 tokens"],
		[124_999, "SMART ZONE · 124,999 tokens"],
		[125_000, "FOCUS DRIFT · 125,000 tokens"],
		[150_000, "FOCUS DRIFT · 150,000 tokens"],
		[150_001, "REFOCUS · 150,001 tokens — /compact or /new"],
		[null, "CONTEXT USAGE PENDING"],
		[undefined, "CONTEXT USAGE PENDING"]
	];
	for (const [tokens, expected] of cases) {
		assert.equal(formatStatus(tokens), expected);
	}
});

test("registers a refresh handler for every event that can change usage, plus shutdown", () => {
	const { events } = createExtension();
	assert.deepEqual(
		events.toSorted(),
		[...REFRESH_EVENTS, "session_shutdown"].sort()
	);
});

test("shows the widget above the editor", async () => {
	const extension = createExtension();
	const { context, getWidget } = createContext(124_999);

	await extension.fire("turn_end", context);

	assert.deepEqual(getWidget(), {
		key: "smart-zone",
		content: ["SMART ZONE · 124,999 tokens"],
		options: { placement: "aboveEditor" }
	});
});

test("shows pending instead of a stale count after compaction", async () => {
	const extension = createExtension();
	const { context, getWidget, setTokens } = createContext(160_000);

	await extension.fire("turn_end", context);
	assert.match(getWidget()?.content?.[0] ?? "", /^REFOCUS/);

	setTokens(null);
	await extension.fire("session_compact", context);

	assert.deepEqual(getWidget()?.content, ["CONTEXT USAGE PENDING"]);
});

test("refreshes on every usage-changing event", async () => {
	const extension = createExtension();
	for (const event of REFRESH_EVENTS) {
		const { context, getWidget } = createContext(130_000);
		await extension.fire(event, context);
		assert.match(getWidget()?.content?.[0] ?? "", /^FOCUS DRIFT/, event);
	}
});

test("clears the widget on shutdown", async () => {
	const extension = createExtension();
	const { context, getWidget } = createContext(100_000);

	await extension.fire("session_start", context);
	await extension.fire("session_shutdown", context);

	assert.deepEqual(getWidget(), {
		key: "smart-zone",
		content: undefined,
		options: undefined
	});
});

test("does nothing without an interactive UI", async () => {
	const extension = createExtension();
	const { context, getWidget } = createContext(160_000, false);

	await extension.fire("turn_end", context);
	await extension.fire("session_shutdown", context);

	assert.equal(getWidget(), undefined);
});
