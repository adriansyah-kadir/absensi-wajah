import { mount, unmount } from 'svelte';
import type { ActionReturn } from 'svelte/action';
import Ripple from './ripple.svelte';

type UseRippleProps =
  | {
    color?: string;
    maxSize?: number;
  }
  | undefined;

export function useRipple(node: HTMLElement, param?: UseRippleProps): ActionReturn {

  function start(ev: MouseEvent) {
    ev.stopPropagation();
    const rect = node.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const max = param?.maxSize ?? Math.max(node.clientWidth, node.clientHeight) * 2;

    const instance = mount(Ripple, {
      target: node,
      props: { maxSize: max, x, y, color: param?.color }
    });

    function normalSpeed() {
      instance.setPlaybackRate(1);
    }
    node.addEventListener('pointerup', normalSpeed);

    instance.setPlaybackRate(0.2);
    instance.finished().finally(() => {
      node.removeEventListener('pointerup', normalSpeed);
      unmount(instance);
    });
  }

  node.addEventListener('pointerdown', start);

  return {
    destroy() {
      node.removeEventListener('pointerdown', start);
    }
  };
}
