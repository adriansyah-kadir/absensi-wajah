  <script lang="ts">
  import { useRipple } from '@ui/ripple/index.js';
  import { builderActions } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { buttonVariants, type ButtonProps } from '.';
  import { cn } from '$lib/utils';
  import { goto } from '$app/navigation';
    import { Loader } from 'lucide-svelte';

  const {
    variant = 'default',
    size,
    class: class_name,
    ...props
  }: HTMLButtonAttributes & 
  { children: Snippet, loading?: boolean, disabled?: boolean, leadingIcon?: Snippet, href?: string } & 
  ButtonProps = $props();

  const ripple_color = ['ghost', 'outline', 'secondary'].includes(variant)
    ? 'rgb(0 0 0 / .3)'
    : 'rgb(255 255 255 / .3)';
</script>

<button
  use:useRipple={{ color: ripple_color }}
  use:builderActions={{ builders: [] }}
  class={cn(buttonVariants({ variant, size, className: class_name }), 'relative overflow-hidden')}
  type="button"
  {...props}
  onclick={props.href ? () => goto(props.href!) : props.onclick}
  disabled={props.loading || props.disabled}
>
  {#if props.loading}
    <Loader size={18} class="mr-2 animate-spin"/>
  {:else if props.leadingIcon}
    <span class="mr-2">
      {@render props.leadingIcon()}
    </span>
  {/if}
  {@render props.children()}
</button>
