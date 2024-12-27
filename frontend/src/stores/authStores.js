// gestionar la autenticacion y el estado del token

import { writable } from "svelte/store";

export const auth = writable({
	isAuthenticated: false,
	token: null,
	role: null,
});

export function setAuth(token, role) {
	auth.set({ token, role });
}

export function clearAuth() {
	auth.set({ token: null, role: null });
}
