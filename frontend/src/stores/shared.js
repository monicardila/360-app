import { writable } from "svelte/store";

export const loading = writable(false);
export const error = writable(null);
