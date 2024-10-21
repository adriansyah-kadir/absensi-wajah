import { browser } from "$app/environment";
import { toast } from "svelte-sonner";
import { get, writable } from "svelte/store";

function createLocationStore() {
  const store = writable<GeolocationPosition | undefined>(undefined);
  const { subscribe, set } = store;
  const {
    promise: wait,
    reject,
    resolve,
  } = Promise.withResolvers<GeolocationPosition>();

  if (browser) {
    navigator.geolocation.watchPosition(
      (loc) => {
        set(loc);
        resolve(loc);
      },
      (err) => {
        console.error(err);
        toast.error(`Locations: ${err.message}`);
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      },
    );
  }

  return {
    subscribe,
    wait,
    toLatLng() {
      const loc = get(store);
      if (loc)
        return [
          loc.coords.latitude,
          loc.coords.longitude,
        ] as L.LatLngExpression;
      return undefined;
    },
  };
}

export const current_location = createLocationStore();
