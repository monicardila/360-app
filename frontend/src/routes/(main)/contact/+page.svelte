<section class=" h-full">
	<form
		class="  bg-white container shadow-xl p-24 md:p-12 mx-auto font-primary text-sm max-w-[800px] h-auto mt-20 rounded-md"
	>
		<h2 class="h2 font-bold text-slate-600">Contactanos</h2>
		<div class="mt-14 w-auto md:flex">
			<div class="md:flex-1 text-center md:text-left">
				<label class="block">
					<span class="block mb-2 font-bold">Nombre Completo</span>
					<input
						type="text"
						class="h-10 w-64 border-slate-200 bg-slate-100 rounded-xl px-2"
						placeholder="John Doe.."
						name="message"
						id="message"
						required
					/>
				</label>
				<label class="block">
					<span class="block mt-6 mb-2 font-bold"
						>Correo electronico</span
					>
					<input
						type="email"
						class="h-10 w-64 border-slate-200 bg-slate-100 rounded-xl px-2"
						placeholder="ejemplo@dominio.com"
						name="email"
						id="email"
						required
					/>
				</label>
				<label class="block mt-6 w-auto">
					<span class="block mt-6 mb-2 font-bold"
						>Tipo de mensaje</span
					>

					<select
						name="type-of-message"
						aria-label="Selecciona el tipo de mensaje"
						class="block h-10 w-64 border-slate-200 bg-slate-100 rounded-xl px-2 mx-auto md:mx-0"
					>
						<option value="user1">Pregunta</option>
						<option value="user2">Sugerencia</option>
						<option value="user3">Solicitud de compra</option>
						<option value="user3">Ayuda al usuario</option>
					</select>
				</label>
				<ul
					class="mt-8 text-secondary flex gap-[54px] justify-center xl:justify-center md:mr-16"
				>
					<li>
						<a href="a"> <i class="ri-facebook-fill"></i></a>
					</li>
					<li>
						<a href="a"> <i class="ri-instagram-fill"></i></a>
					</li>
					<li>
						<a href="a"> <i class="ri-twitter-fill"></i></a>
					</li>
				</ul>
			</div>
			<div class="md:flex text-center">
				<label class="block mt-6 md:mt-0">
					<span class="block mb-2 md:text-left font-bold"
						>Mensaje</span
					>
					<textarea
						class="min-w-72 min-h-32 md:w-96 md:h-56 p-2 rounded-xl mx-auto md:mx-0 border border-slate-200 bg-slate-100"
					></textarea>
				</label>
			</div>
		</div>
		<div class="flex justify-center mt-4 md:justify-end">
			<button class=" btn btn-primary"
				><i class="ri-send-plane-fill"></i> Enviar</button
			>
		</div>
	</form>
	<div
		class="container font-secondary text-lg md:flex-row flex flex-col mt-10 items-center mx-auto max-w-3xl"
	>
		<h2 class="flex text-left mr-10 md:mt-20 font-bold">
			Preguntas <br /> frecuentes
		</h2>
		<div class="flex-1">
			<details
				class="w-auto bg-white mt-10 p-4 max-w-md shadow-sm cursor-pointer"
			>
				<summary class=" text-left"
					>¿Es la aplicación compatible con dispositivos móviles?</summary
				>
				<p class="text-zinc-500">
					Sí, la aplicación es completamente responsiva y se puede
					usar en dispositivos móviles y tabletas.
				</p>
			</details>

			<details
				class="w-auto bg-white p-4 max-w-md shadow-sm cursor-pointer"
			>
				<summary class="  text-left"
					>¿Puedo exportar el inventario a un archivo?</summary
				>
				<p class="text-zinc-500">
					Sí, puedes exportar el inventario a CSV o Excel desde la
					sección de "Exportar"
				</p>
			</details>
			<details
				class="w-auto bg-white p-4 max-w-md shadow-sm cursor-pointer"
			>
				<summary class=" text-left"
					>¿Puedo ver un historial de cambios en el inventario?</summary
				>
				<p class="text-zinc-500">
					Sí, dirígete a la sección "Historial" para revisar los
					cambios y actualizaciones del inventario.
				</p>
			</details>
			<details
				class="w-auto bg-white p-4 max-w-md shadow-sm cursor-pointer"
			>
				<summary class=" text-left"
					>¿La aplicación ofrece soporte técnico?</summary
				>
				<p class="text-zinc-500">
					Sí, ofrecemos soporte técnico a través de correo
					electrónico, chat en vivo y una base de conocimientos.
				</p>
			</details>
			<details
				class="w-auto bg-white p-4 max-w-md shadow-sm cursor-pointer"
			>
				<summary class=" text-left"
					>¿La aplicación permite la gestión de proveedores?</summary
				>
				<p class="text-zinc-500">
					Sí, puedes agregar y gestionar información de proveedores y
					vincularlos a productos específicos.
				</p>
			</details>
		</div>
	</div>
</section>
