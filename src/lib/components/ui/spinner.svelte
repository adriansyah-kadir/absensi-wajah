<script lang="ts">
	const props: {
		size?: string;
	} = $props();
</script>

<div
	style="width: {props.size};"
	class="mr-2 aspect-square animate-spin rounded-full border-2 border-t-black"
></div>
