<div class="flex items-center justify-center min-h-screen bg-gray-100">
	<div
		class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
	>
		<div class="flex flex-col justify-center p-8 md:p-14">
			<span class=" text-primary text-center py-8 font-bold"
				><i class="ri-signal-tower-fill text-6xl"></i></span
			>
			<form class="block text-sm">
				<label class="py-4 block">
					<span class="mb-2 text-sm font-bold"> Nombre completo</span>
					<input
						type="text"
						class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
						placeholder="John Doe"
						name="name-user"
						id="name-user"
						required
					/>
				</label>
				<form class="block text-sm">
					<label class="py-4 block">
						<span class="mb-2 text-sm font-bold">
							Nombre marca comercial</span
						>
						<input
							type="text"
							class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
							name="name-user"
							placeholder="Nombre tienda / marca"
							id="name-user"
							required
						/>
					</label>
					<label class="block py-4 text-sm">
						<span class=" mb-2 text-sm font-bold">Email</span>
						<input
							type="email"
							class="peer w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
							name="email-user"
							id="email-user"
							placeholder="ejemplo@gmail.com"
							required
						/>
					</label>
					<label class="block py-4 text-sm">
						<span class=" mb-2 text-sm font-bold"
							>Codigo de seguridad</span
						>
						<input
							type="text"
							class="peer w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
							name="code-user"
							id="code-user"
							placeholder="### - ###"
							required
						/>
					</label>
					<label class="block py-4">
						<span class="mb-2 text-sm font-bold"> Contrasena</span>
						<input
							type="password"
							class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
							name="password"
							id="password"
							required
						/>
					</label>
					<label class="block py-4">
						<span class="mb-2 text-sm font-bold">
							Confirmar contrasena</span
						>
						<input
							type="password"
							class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
							name="password-user"
							id="password-user"
							required
						/>
					</label>
				</form>
				<div class="flex py-10 items-center justify-center">
					<a
						href="login"
						class="text-sm text-white font-bold px-20 py-4 bg-secondary rounded-xl font-secondary hover:bg-primary hover:text-white"
						>REGISTRARSE
					</a>
				</div>
			</form>
		</div>
	</div>
</div>

<!--  lo mismo en registro solo que siguiendo en mockup  -->
