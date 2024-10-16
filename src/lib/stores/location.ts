import { browser } from "$app/environment";
import { readable } from "svelte/store";

export const current_location = readable<GeolocationPosition>(undefined, set => {
  if(browser) {
    navigator.geolocation.watchPosition(set)
  }
})