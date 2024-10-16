import { browser } from "$app/environment";
import { readable } from "svelte/store";

export const is_offline = readable(false, (set) => {
  if (browser) {
    window.addEventListener("offline", () => {
      set(true);
    });

    window.addEventListener("online", () => {
      set(false);
    });
  }
});
