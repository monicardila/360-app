<!-- para celular poner un footer con la camara
 en el normal hacer una calculadora y despues mejorarala con svlete -->

<script>
	import { auth, updateAuthFromCookie } from "../../../../stores/authStores";
	import { onMount } from "svelte";

	let isAuthenticated;
	let role;

	$: auth.subscribe(($auth) => {
		isAuthenticated = $auth.isAuthenticated;
		role = $auth.role;
	});

	// Suscríbete al store para obtener el estado actualizado

	onMount(() => {
		updateAuthFromCookie(); // Fuerza la actualización del store al cargar la vista
	});
</script>

<section>
	<div class="">
		<p class=" mt-12 bg-sky-700 text-white p-2 rounded-md">
			Punto de venta
		</p>
	</div>
</section>
{#if role === "admin"}
	<!-- DEBERIA APARECER SOLO ADMIN------------------------------------------------------------------------ -->
	<section>
		<div
			class=" p-10 w-full mx-auto relative flex flex-wrap gap-2 text-sm justify-center"
		>
			<!-- Contenedor Izquierdo -->
			<div
				class="hidden xl:block max-w-sm bg-white p-10 flex-grow drop-shadow-lg border border-gray-200"
			>
				<h1 class="text-3xl font-bold border-b border-slate-800 pb-9">
					Inventario
				</h1>
				<!-- tabla -->
				<table class="table-fixed w-full">
					<thead>
						<tr>
							<th class="pb-2 pt-4 pr-10">#</th>
							<th class="pb-2 pt-4 pr-10">Producto</th>
							<th class="pb-2 pt-4 pr-10">Cantidad</th>
							<th class="pb-2 pt-4 pr-20">Precio</th>
							<th class="pb-2 pt-4 pr-20">Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="pb-2 pt-2 pr-10">1</td>
							<td class="pb-2 pt-2 pr-10">Leche</td>
							<td class="pb-2 pt-2 pr-10">12</td>
							<td class="pb-2 pt-2 pr-20">4.500</td>
							<td class="pb-2 pt-2 pr-20">54.000</td>
						</tr>
						<tr>
							<td class="pb-2 pt-2 pr-10">2</td>
							<td class="pb-2 pt-2 pr-10">Verduras</td>
							<td class="pb-2 pt-2 pr-10">1</td>
							<td class="pb-2 pt-2 pr-20">2.000</td>
							<td class="pb-2 pt-2 pr-20">2.000</td>
						</tr>
						<tr>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-10">Gomas</td>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-20">2.500</td>
							<td class="pb-2 pt-2 pr-20">7.500</td>
						</tr>
						<tr>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-10">Gomas</td>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-20">2.500</td>
							<td class="pb-2 pt-2 pr-20">7.500</td>
						</tr>
						<tr>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-10">Gomas</td>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-20">2.500</td>
							<td class="pb-2 pt-2 pr-20">7.500</td>
						</tr>
						<tr>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-10">Gomas</td>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-20">2.500</td>
							<td class="pb-2 pt-2 pr-20">7.500</td>
						</tr>
						<tr>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-10">Gomas</td>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-20">2.500</td>
							<td class="pb-2 pt-2 pr-20">7.500</td>
						</tr>
						<tr>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-10">Gomas</td>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-20">2.500</td>
							<td class="pb-2 pt-2 pr-20">7.500</td>
						</tr>
						<tr>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-10">Gomas</td>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-20">2.500</td>
							<td class="pb-2 pt-2 pr-20">7.500</td>
						</tr>
						<tr>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-10">Gomas</td>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-20">2.500</td>
							<td class="pb-2 pt-2 pr-20">7.500</td>
						</tr>
						<tr>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-10">Gomas</td>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-20">2.500</td>
							<td class="pb-2 pt-2 pr-20">7.500</td>
						</tr>
						<tr>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-10">Gomas</td>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-20">2.500</td>
							<td class="pb-2 pt-2 pr-20">7.500</td>
						</tr>
						<tr>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-10">Gomas</td>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-20">2.500</td>
							<td class="pb-2 pt-2 pr-20">7.500</td>
						</tr>
						<tr>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-10">Gomas</td>
							<td class="pb-2 pt-2 pr-10">3</td>
							<td class="pb-2 pt-2 pr-20">2.500</td>
							<td class="pb-2 pt-2 pr-20">7.500</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Contenedor Central -->
			<div
				class="hidden md:block mx-auto xl:mx-2 min-w-[250px] max-w-4xl bg-white p-8 shadow-md flex-grow mt-0 drop-shadow-lg border border-gray-200"
			>
				<h1 class="text-3xl font-bold pb-9">Orden de venta</h1>
				<div class=" relative">
					<form class="absolute right-0 bottom-14">
						<label class=" right-80 absolute">
							Empleado
							<select
								name="type-empleado"
								aria-label="Empleado"
								class="border border-black absolute w-48 pl-2 ml-4"
							>
								<option value="opcion"> Monica Ardila</option>
								<option value="opcion"> Tomas Panqueva</option>
								<option value="opcion">
									Alexandra Moreno</option
								>
								<option value="opcion"> Felipe Manrique</option>
							</select>
						</label>
					</form>
				</div>

				<div class="relative">
					<fieldset>
						<legend>INFORMACIÓN CLIENTE</legend>
						<div class="pl-5 pt-5 pb-3">
							<label
								>Cliente
								<input
									type="text"
									placeholder="John Doe"
									required
									class="border border-gray-800 w-42 pl-2 ml-6"
								/>
							</label>
						</div>
						<div class="ml-72 top-10 absolute">
							<label
								>Fecha
								<input
									type="date"
									required
									class="border border-gray-800 w-48 pl-2 ml-10"
								/>
							</label>
						</div>
						<div class="pl-5">
							<label
								>Tipo
								<select
									name="type-id"
									aria-label="Tipo de identificación"
									class="border border-gray-800 ml-10"
								>
									<option value="opcion">
										Cedula de ciudadania</option
									>
									<option value="opcion">
										Cedula de extrangeria/option>
									</option><option value="opcion">
										Targeta de identificación</option
									>
									<option value="opcion"> Nit</option>
								</select>
							</label>
						</div>
						<div class=" ml-96 top-20 absolute">
							<label
								>Numero
								<input
									type="number"
									placeholder="7912394"
									required
									class="border border-gray-800 w-32 pl-2 ml-6"
								/>
							</label>
						</div>
					</fieldset>
				</div>
				<!-- tabla -->
				<div class="border border-black mt-5 pb-3">
					<table class="table-fixed w-full ml-10">
						<thead>
							<tr>
								<th class="pb-10 pt-5 pr-10">#</th>
								<th class="pb-10 pt-5 pr-10">Producto</th>
								<th class="pb-10 pt-5 pr-10">Cantidad</th>
								<th class="pb-10 pt-5 pr-20">Precio</th>
								<th class="pb-10 pt-5 pr-20">Total</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="pb-2 pt-2 pr-10">3</td>
								<td class="pb-2 pt-2 pr-10">Gomas</td>
								<td class="pb-2 pt-2 pr-10">3</td>
								<td class="pb-2 pt-2 pr-20">2.500</td>
								<td class="pb-2 pt-2 pr-20">7.500</td>
							</tr>
							<tr>
								<td class="pb-2 pt-2 pr-10">3</td>
								<td class="pb-2 pt-2 pr-10">Gomas</td>
								<td class="pb-2 pt-2 pr-10">3</td>
								<td class="pb-2 pt-2 pr-20">2.500</td>
								<td class="pb-2 pt-2 pr-20">7.500</td>
							</tr>
							<tr>
								<td class="pb-2 pt-2 pr-10">3</td>
								<td class="pb-2 pt-2 pr-10">Gomas</td>
								<td class="pb-2 pt-2 pr-10">3</td>
								<td class="pb-2 pt-2 pr-20">2.500</td>
								<td class="pb-2 pt-2 pr-20">7.500</td>
							</tr>
							<tr>
								<td class="pb-2 pt-2 pr-10">3</td>
								<td class="pb-2 pt-2 pr-10">Gomas</td>
								<td class="pb-2 pt-2 pr-10">3</td>
								<td class="pb-2 pt-2 pr-20">2.500</td>
								<td class="pb-2 pt-2 pr-20">7.500</td>
							</tr>
							<tr>
								<td class="pb-2 pt-2 pr-10">3</td>
								<td class="pb-2 pt-2 pr-10">Gomas</td>
								<td class="pb-2 pt-2 pr-10">3</td>
								<td class="pb-2 pt-2 pr-20">2.500</td>
								<td class="pb-2 pt-2 pr-20">7.500</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="mt-28 mb-8 relative">
					<h3 class="text-5xl font-bold">Total: $ 20.4</h3>
					<button
						class=" bg-black text-xl text-white py-6 px-20 rounded-2xl absolute right-0 bottom-1 mx-1"
						>Pagar</button
					>
				</div>
			</div>
			<!-- view mobiles -->
			<div class="w-full container md:hidden">
				<h3
					class="text-secondary mb-10 font-bold text-[26px] font-primary"
				>
					Escanear productos
				</h3>
				<div class="grid grid-rows-2 p-x">
					<div>
						<p class="text-lg">Conectar con el computador</p>
						<p class="text-[16px] text-gray-400">
							Activar bluetooth
						</p>
					</div>
					<div class="text-end text-lg">
						<button
							class="bg-primary mr-10 text-white px-6 py-1 rounded items-end"
							>Conectar</button
						>
					</div>
				</div>
				<div class="">
					<label class="block">
						<span class="block mt-6 mb-2 font-bold"
							>Ingresar serial codigo de QR</span
						>
						<input
							type="text"
							class="h-10 w-64 border rounded-sm px-2"
							placeholder="1214854121231547"
							name="codigoQR"
							id="codigoQR"
							required
						/>
					</label>
					<label class="block">
						<span class="block mt-6 mb-2 font-bold"
							>Ingresar serial codigo de barras</span
						>
						<input
							type="text"
							class="h-10 w-64 border rounded-sm px-2"
							placeholder="6547654121"
							name="codigoBarras"
							id="codigoBarras"
							required
						/>
					</label>
					<div class="text-end px-12">
						<button
							><i
								class="ri-add-line rounded-full bg-primary text-white text-5xl"
							></i></button
						>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- temporary-div -->
	<div class="h-[200px]"></div>
	<footer class="md:hidden text-center">
		<button
			><i class="ri-qr-code-line text-secondary text-6xl my-4 mx-6"
			></i></button
		>
		<button
			><i class="ri-camera-fill text-secondary text-6xl my-4 mx-6"
			></i></button
		>
		<button
			><i class="ri-qr-scan-2-line text-secondary text-6xl my-4 mx-6"
			></i></button
		>
	</footer>
{:else if role === "user"}
	<!-- DEBERIA APARECER SOLO USER ------------------------------------------------------------------------->
	<p class=" bg-blue-400 mt-40">usted es usuario</p>
{:else}
	<p class="bg-yellow-500 mt-40">You do not have access to this page.</p>
{/if}
