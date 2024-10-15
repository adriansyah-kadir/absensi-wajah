<script lang='ts'>
    import type { Tables } from "$lib/supabase/types";

  const props: {
    account: Tables<'accounts'>
  } = $props()
</script>

{props.account.name}