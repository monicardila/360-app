<script>
	import { onMount } from "svelte";
	import { setAuth } from "../../../../stores/authStores";

	let name = "";
	let email = "";
	let password = "";
	let confirmPassword = "";
	let role = "";
	let brand = "";
	let error = null;

	async function register() {
		if (password !== confirmPassword) {
			error = "Password do not match";
			return;
		}

		try {
			const response = await fetch(
				"http://localhost:3000/api/v1/auth/register",
				{
					method: "POST",
					headers: {
						"content-Type": "application/json",
					},
					body: JSON.stringify({
						name,
						email,
						password,
						role,
						brand,
					}),
				},
			);

			const data = await response.json();
			console.log("Data: ", data);

			if (!response.ok) {
				throw new Error(data.error || "Registration failed");
			} else if (response.ok) {
				alert("Successfully register");
				window.location.href = "/app/auth/login";
			}

			setAuth(data.token, data.role);
		} catch (error) {
			console.log(error.message);
		}
	}
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
	<div
		class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
	>
		<div class="flex flex-col justify-center p-8 md:p-14">
			<span class="text-primary text-center py-8 font-bold">
				<i class="ri-signal-tower-fill text-6xl"></i>
			</span>
			<form on:submit|preventDefault={register} class="block text-sm">
				<label class="py-4 block">
					<span class="mb-2 text-sm font-bold">Nombre completo</span>
					<input
						bind:value={name}
						type="text"
						class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
						placeholder="John Doe"
						required
					/>
				</label>
				<label class="py-4 block">
					<span class="mb-2 text-sm font-bold">Marca</span>
					<input
						bind:value={brand}
						type="text"
						class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
						placeholder="PLUGNET"
						required
					/>
				</label>
				<label class="py-4 block">
					<span class="mb-2 text-sm font-bold">Rol</span>
					<select
						name="role"
						id=""
						bind:value={role}
						class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
						required
					>
						<option value="user">USER</option>
						<option value="admin">ADMIN</option>
					</select>
				</label>
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
				<label class="block py-4">
					<span class="mb-2 text-sm font-bold"
						>Confirmar contraseña</span
					>
					<input
						bind:value={confirmPassword}
						type="password"
						class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
						required
					/>
				</label>
				<a
					href="/app/auth/login"
					class=" text-sm text-emerald-700 hover:text-sky-600 hover:underline"
					>Iniciar sesion</a
				>
				{#if error}
					<p class="text-red-500 text-sm py-2">{error}</p>
				{/if}
				<div class="flex py-10 items-center justify-center">
					<button
						type="submit"
						class="text-sm text-white font-bold px-20 py-4 bg-secondary rounded-xl font-secondary hover:bg-primary hover:text-white"
					>
						REGISTRARSE
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
