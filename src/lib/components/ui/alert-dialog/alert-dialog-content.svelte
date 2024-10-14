<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
	import * as AlertDialog from './index.js';
	import { cn, flyAndScale } from '$lib/utils.js';

	type $$Props = AlertDialogPrimitive.ContentProps;

	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = undefined;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<AlertDialog.Portal>
	<AlertDialog.Overlay />
	<AlertDialogPrimitive.Content
		{transition}
		{transitionConfig}
		class={cn(
			'fixed bottom-0 left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:bottom-[50%] md:w-full md:translate-y-[50%]',
			className
		)}
		{...$$restProps}
	>
		<slot />
	</AlertDialogPrimitive.Content>
</AlertDialog.Portal>
