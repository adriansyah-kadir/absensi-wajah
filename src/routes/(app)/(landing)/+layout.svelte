<script lang="ts">
	import { useRipple } from '@ui/ripple';
	import Navbar from '$lib/components/navbar.svelte';
</script>

<div
	use:useRipple={{ color: 'pink', maxSize: 50 }}
	class="relative flex min-h-screen w-full flex-col-reverse justify-between bg-background text-foreground sm:flex-col sm:justify-start"
>
	<Navbar />
	<div class="h-full w-full">
		<slot></slot>
	</div>
</div>
