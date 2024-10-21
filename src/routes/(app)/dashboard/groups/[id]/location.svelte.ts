import type { Tables } from "$lib/supabase/types";
import { mount } from "svelte";
import AbsenPositionInfo from "./absen-position-info.svelte";
import L from "leaflet";
import { getClient } from "$lib/supabase/client";
import { toastPromise } from "$lib/utils";

type Options = {
  draggable?: boolean;
};

export class AbsenLocation {
  map: L.Map;

  data: Tables<"absen_locations">;

  layers: {
    marker: L.Marker;
    circle: L.Circle;
  };

  constructor(map: L.Map, data: Tables<"absen_locations">, options?: Options) {
    const pos: L.LatLngExpression = [data.latitude, data.longitude];
    const radius = data.radius;

    this.data = data;

    this.map = map;

    this.layers = {
      marker: L.marker(pos, { draggable: options?.draggable }),
      circle: L.circle(pos, { radius }),
    };

    const absen_location = this;

    this.layers.marker.bindPopup((layer) => {
      const container = document.createElement("div");
      mount(AbsenPositionInfo, {
        target: container,
        props: { absen_location },
      });
      return container;
    });

    this.layers.marker.on("dragend", () => {
      this.layers.circle.setLatLng(this.layers.marker.getLatLng());
    });

    this.eachLayers(({ layer }) => {
      layer.addTo(map);
    });
  }

  setPos(pos: L.LatLngExpression) {
    this.layers.marker.setLatLng(pos);
    this.layers.circle.setLatLng(pos);
  }

  setRadius(radius: number) {
    this.layers.circle.setRadius(radius);
  }

  eachLayers(cb: (kv: { layer: L.Layer; key: string }) => void) {
    for (const [k, v] of Object.entries(this.layers)) cb({ key: k, layer: v });
  }

  async save() {
    const { promise, reject, resolve } = Promise.withResolvers();
    toastPromise(promise, "Saving Absen Locations");
    const client = getClient();
    const result = await client
      .from("absen_locations")
      .update({
        latitude: this.layers.marker.getLatLng().lat,
        longitude: this.layers.marker.getLatLng().lng,
        radius: this.layers.circle.getRadius(),
      })
      .eq("id", this.data.id);

    if (result.error) return reject(result.error);
    resolve(result.data);
  }

  async destroy() {
    const client = getClient();
    const p = Promise.withResolvers();
    toastPromise(p.promise, "Delete Absen Locations");
    const result = await client
      .from("absen_locations")
      .delete()
      .eq("id", this.data.id);
    console.log(result);
    if (result.error) return p.reject(result.error);
    p.resolve(result.data);
    this.eachLayers(({ layer }) => layer.remove());
  }
}
