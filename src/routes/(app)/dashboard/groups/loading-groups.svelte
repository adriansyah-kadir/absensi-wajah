<script>
  import { Card, CardHeader, CardTitle, CardDescription } from "@ui/card";
  import { Skeleton } from "@ui/skeleton";
  import Spinner from "@ui/spinner.svelte";
  import { Button } from "@ui/button";
</script>

<Card class="aspect-video w-full max-w-sm">
  <CardHeader
    class="flex-row items-start flex-nowrap space-y-0 justify-between"
  >
    <div class="w-fit space-y-1">
      <Skeleton class="w-fit h-fit rounded-none">
        <CardTitle>Loading Title</CardTitle>
      </Skeleton>
      <Skeleton class="w-fit h-fit rounded-none">
        <CardDescription>Loading Description</CardDescription>
      </Skeleton>
    </div>
    <Button variant="ghost" size="icon" class="center"><Spinner size="3.5rem" /></Button>
  </CardHeader>
</Card>
