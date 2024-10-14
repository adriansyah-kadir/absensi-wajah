<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div class={cn("bg-muted animate-pulse h-fit w-fit", className)} {...$$restProps}>
	<div class="opacity-0"><slot></slot></div>
</div>
