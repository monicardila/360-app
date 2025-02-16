import { writable } from "svelte/store";

// Verifica si estamos en el navegador antes de usar localStorage
const isBrowser = typeof window !== "undefined";

const storedToken = isBrowser ? localStorage.getItem("token") : null;
const storedRole = isBrowser ? localStorage.getItem("role") : null;

export const auth = writable({
	isAuthenticated: !!storedToken,
	token: storedToken,
	role: storedRole,
});

// ✅ Función para actualizar la autenticación en cualquier parte del código
export function setAuth(token, role) {
	auth.set({
		isAuthenticated: !!token,
		token,
		role,
	});

	if (isBrowser) {
		localStorage.setItem("token", token);
		localStorage.setItem("role", role);
	}
}

// ✅ Función para obtener datos desde cookies si localStorage no está disponible
export function updateAuthFromCookie() {
	if (!isBrowser) return;

	const token = document.cookie
		.split("; ")
		.find((row) => row.startsWith("token="))
		?.split("=")[1];

	const role = document.cookie
		.split("; ")
		.find((row) => row.startsWith("role="))
		?.split("=")[1];

	if (token) {
		setAuth(token, role);
	}
}

// ✅ Función para cerrar sesión y limpiar todo
export function logout() {
	auth.set({ isAuthenticated: false, token: null, role: null });

	if (isBrowser) {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		document.cookie =
			"token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		document.cookie =
			"role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
	}
}
