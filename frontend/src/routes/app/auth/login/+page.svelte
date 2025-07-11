<script>
	import { auth, setAuth } from "../../../../stores/authStores"; // Traemos el store y la función para actualizarlo
	import { onDestroy } from "svelte";

	let email = "";
	let password = "";

	// Suscripción al store 'auth' para obtener los valores de autenticación
	const unsubscribe = auth.subscribe(($auth) => {
		// Estos valores son reactivos, cambiarán automáticamente si el store cambia
		console.log("Datos de autenticación:", $auth);
	});

	// Limpiar la suscripción al destruir el componente
	onDestroy(() => unsubscribe());

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				"http://localhost:3100/api/v1/auth/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
					credentials: "include",
				},
			);

			const data = await response.json();
			console.log("Respuesta del servidor:", data);

			if (!response.ok) {
				throw new Error(data.error || "Credenciales incorrectas");
			}

			// Verifica si el token y el role existen antes de actualizar el store
			if (data.token && data.role) {
				setAuth(data.token, data.role);
				console.log("Autenticado con éxito:", data.token, data.role);

				alert("Login exitoso");
				window.location.href = "/app/cashier";
			} else {
				throw new Error("Respuesta del servidor incompleta");
			}
		} catch (error) {
			console.error("Error de autenticación:", error.message);
			alert(error.message);
		}
	};
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
	<div
		class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
	>
		<div class="flex flex-col justify-center p-8 md:p-14">
			<span class="text-primary text-center py-8 font-bold">
				<i class="ri-signal-tower-fill text-6xl"></i>
			</span>
			<form on:submit={handleLogin} class="block text-sm">
				<label class="block py-4 text-sm">
					<span class="mb-2 text-sm font-bold">Email</span>
					<input
						bind:value={email}
						type="email"
						class="peer w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
						placeholder="ejemplo@gmail.com"
						required
					/>
				</label>
				<label class="block py-4">
					<span class="mb-2 text-sm font-bold">Contraseña</span>
					<input
						bind:value={password}
						type="password"
						class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
						required
					/>
				</label>
				<a
					href="/app/auth/register"
					class=" text-sm text-emerald-700 hover:text-sky-600 hover:underline"
					>Registrate aqui</a
				>
				<div class="flex py-10 items-center justify-center">
					<button
						type="submit"
						class="text-sm text-white font-bold px-20 py-4 bg-secondary rounded-xl font-secondary hover:bg-primary hover:text-white"
					>
						INGRESAR
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

<!--   AUTENTICACION PARA ENTRAR A CIERTA VISTA
<script>
    import { auth, logout } from '../lib/stores/auth';
    import { onMount } from 'svelte';

    let user = null;

    onMount(async () => {
        auth.subscribe(({ token }) => {
            if (!token) window.location.href = '/login'; // 🔹 Redirigir si no está logueado
        });

        const response = await fetch('http://localhost:3000/profile', {
            headers: { Authorization: localStorage.getItem('token') }
        });

        user = await response.json();
    });
</script>

<h1>Bienvenido {user?.email}</h1>
<button on:click={logout}>Cerrar sesión</button>  -->
