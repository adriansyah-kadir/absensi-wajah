<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import Spinner from '@ui/spinner.svelte';
	import { Debounced } from 'runed';
	import { fly } from 'svelte/transition';

	let show = $state(false);

	beforeNavigate(() => {
		show = true;
	});

	afterNavigate(() => {
		show = false;
	});

	let showDebounced = new Debounced(() => show, 300);
</script>

{#if showDebounced.current}
	<div
		transition:fly={{ y: -20 }}
		class="fixed right-1/2 top-5 z-[999] flex translate-x-1/2 items-center rounded-full border-[1px] bg-background px-5 py-2 shadow-lg"
	>
		<Spinner size="1rem" class="mr-4 border"/>
		loading
	</div>
{/if}
