<script lang="ts">
  import { Skeleton } from "@ui/skeleton";
  import type { PageData } from "./$types";

  const props: {
    data: PageData;
  } = $props();
</script>

<div class="h-full w-full p-5 prose">
  {#await props.data.group}
    <Skeleton>
      <h2>Loading Group</h2>
    </Skeleton>
  {:then result}
    {@const group = result.data}
    <h2>{group?.name}</h2>
    <!-- {:catch error} -->
    <!--   <h2>Error getting group info {String(error)}</h2> -->
  {/await}
</div>
