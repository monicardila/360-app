<script>
	import { auth, setAuth } from "../../../../stores/authStores";

	let email = "";
	let password = "";

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3000/app/login", {
				method: "POST",
				headers: { "Content-Type": "application/JSON" },
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();

			if (response.ok) {
				setAuth(data.token, data.role);
				alert("Login successful");

				window.location.href = "/app/";
			} else {
				alert(data.error || "Invalid credentials  /login");
			}
		} catch (error) {
			console.log(error);
			alert("Error connecting to server");
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
			<form on:submit|preventDefault={handleLogin} class="block text-sm">
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
					href="/app/register"
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
