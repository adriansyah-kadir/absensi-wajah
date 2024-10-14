<script lang="ts">
  import { watch } from "runed";
  import { onMount } from "svelte";

  const {
    maxSize,
    ...props
  }: {
    maxSize: number;
    x: number;
    y: number;
    color?: string;
  } = $props();

  let el: HTMLDivElement | null = null;
  let animation: Animation | null = null;
  let playbackRate = $state(1);
  const animationFinished = Promise.withResolvers();

  export function finished() {
    return animationFinished.promise;
  }

  export function setPlaybackRate(n: number) {
    playbackRate = n;
  }

  watch(
    () => playbackRate,
    (v) => {
      if (animation) animation.playbackRate = v;
    },
  );

  onMount(() => {
    const keyframes = new KeyframeEffect(
      el,
      [
        { width: "0px", height: "0px", opacity: 1 },
        { width: `${maxSize}px`, height: `${maxSize}px`, opacity: 0 },
      ],
      { duration: 500, fill: "forwards" },
    );
    animation = new Animation(keyframes, document.timeline);
    animation.onfinish = animationFinished.resolve;
    animation.playbackRate = playbackRate;
    animation.play();
  });
</script>

<div
  bind:this={el}
  style="left: {props.x}px; top: {props.y}px;"
  style:background-color={props.color}
  class="pointer-events-none absolute z-[0] h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/20"
></div>
