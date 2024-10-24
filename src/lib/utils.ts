import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import { toast } from "svelte-sonner";
import { onMount } from "svelte";
import { writable } from "svelte/store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
  y?: number;
  x?: number;
  start?: number;
  duration?: number;
};

export const flyAndScale = (
  node: Element,
  params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 },
): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;

  const scaleConversion = (
    valueA: number,
    scaleA: [number, number],
    scaleB: [number, number],
  ) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  const styleToString = (
    style: Record<string, number | string | undefined>,
  ): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + `${key}:${style[key]};`;
    }, "");
  };

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t,
      });
    },
    easing: cubicOut,
  };
};

export function Log<T>(v: T, ...rest: any) {
  console.log(v, ...rest);
  return v;
}

export function toastPromise<T>(promise: Promise<T>, ctx: string) {
  toast.promise(promise, {
    success: `Success ${ctx}`,
    error: (err) => {
      console.error(err);
      return `Error ${ctx}`;
    },
    loading: `Loading ${ctx}`,
  });
}

export async function getLocation() {
  const p = Promise.withResolvers<GeolocationPosition>();
  navigator.geolocation.getCurrentPosition(p.resolve, p.reject);
  return p.promise;
}

export function onLocation() {
  return {
    onMount() {
      console.log("asdf");
    },
  };
}

export function nonNullable<T>(t: T | null | undefined): t is T {
  return t !== null && t !== undefined;
}

export function promiseState<T, E = any>(promise?: Promise<T>) {
  const state = writable<{
    pending: boolean;
    value?: T;
    error?: E;
  }>({
    pending: true,
    value: undefined,
    error: undefined,
  });

  const { subscribe, update } = state;

  if (promise) {
    promise.then((value) => update((v) => ({ pending: false, value: value })));
    promise.catch((error) => update((v) => ({ pending: false, error: error })));
  }

  return {
    subscribe,
    resolve: (v: T) => update((prev) => ({ pending: false, value: v })),
    reject: (e: E) => update((prev) => ({ pending: false, error: e })),
  };
}

export function delayed(fn: () => void, ms: number) {
  return () => {
    setTimeout(fn, ms);
  };
}
