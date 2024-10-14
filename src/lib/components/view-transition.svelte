<script>
	import { onNavigate } from '$app/navigation';

	onNavigate((nav) => {
		return new Promise((res) => {
			document.startViewTransition(async () => {
				res();
				await nav.complete;
			});
		});
	});
</script>

<style>
	::view-transition-group(root),
	::view-transition-old(root),
	::view-transition-new(root) {
		animation: none !important;
	}
</style>
