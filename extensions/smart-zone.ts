// Show Pi's active context usage above the editor, independent of footer extensions.
import type {
	ExtensionAPI,
	ExtensionContext
} from "@earendil-works/pi-coding-agent";

const WIDGET_KEY = "smart-zone";
const SMART_ZONE_LIMIT = 125_000;
const REFOCUS_LIMIT = 150_000;

/** Describe the active context usage; `null` or `undefined` means Pi has no estimate. */
export function formatStatus(tokens: number | null | undefined): string {
	if (typeof tokens !== "number") {
		return "CONTEXT USAGE PENDING";
	}

	const count = `${tokens.toLocaleString("en-US")} tokens`;
	if (tokens < SMART_ZONE_LIMIT) {
		return `SMART ZONE · ${count}`;
	}
	if (tokens <= REFOCUS_LIMIT) {
		return `FOCUS DRIFT · ${count}`;
	}
	return `REFOCUS · ${count} — /compact or /new`;
}

function updateWidget(ctx: ExtensionContext): void {
	if (!ctx.hasUI) {
		return;
	}
	ctx.ui.setWidget(WIDGET_KEY, [formatStatus(ctx.getContextUsage()?.tokens)], {
		placement: "aboveEditor"
	});
}

export default function smartZone(pi: ExtensionAPI): void {
	// Each of these events can change Pi's active context usage.
	pi.on("session_start", (_event, ctx) => updateWidget(ctx));
	pi.on("turn_end", (_event, ctx) => updateWidget(ctx));
	pi.on("model_select", (_event, ctx) => updateWidget(ctx));
	pi.on("session_compact", (_event, ctx) => updateWidget(ctx));
	pi.on("session_tree", (_event, ctx) => updateWidget(ctx));
	pi.on("session_shutdown", (_event, ctx) => {
		if (ctx.hasUI) {
			ctx.ui.setWidget(WIDGET_KEY, undefined);
		}
	});
}
