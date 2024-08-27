<section class="bg-white p-2 lg:p-10 font-primary text-sm">
	<div class="container mx-auto hidden md:block">
		<h1 class="text-2xl font-bold mb-6">Tabla de Clientes</h1>
		<label class="ml-5">
			Identificación
			<input type="number" class="border border-black p-2 mb-5 ml-2" />
			<button class="p-2 bg-orange-400 rounded border border-y-red-600"
				>Buscar</button
			>
		</label>
		<!-- overflow-x-auto lo que genera es una barra de desplazamiento en caso de no quepa en la panatalla -->
		<div class="overflow-x-auto">
			<table class="table-auto w-full bg-white shadow-md rounded">
				<thead class="bg-gray-200">
					<tr>
						<th class="px-4 py-2">#</th>
						<th class="px-4 py-2">Identificación</th>
						<th class="px-4 py-2">Nombre</th>
						<th class="px-4 py-2">Historial de Compra</th>
						<th class="px-4 py-2">Última Compra</th>
						<th class="px-4 py-2">Cantidad de Producto</th>
						<th class="px-4 py-2">Precio</th>
						<th class="px-4 py-2">Opciones</th>
					</tr>
				</thead>
				<tbody>
					<!-- Ejemplos de filas -->
					<tr>
						<td class="border px-4 py-2">1</td>
						<td class="border px-4 py-2">1234567890</td>
						<td class="border px-4 py-2">Juan Pérez</td>
						<td class="border px-4 py-2">5 compras</td>
						<td class="border px-4 py-2">2023-06-01</td>
						<td class="border px-4 py-2">10</td>
						<td class="border px-4 py-2">$200.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">2</td>
						<td class="border px-4 py-2">2345678901</td>
						<td class="border px-4 py-2">María López</td>
						<td class="border px-4 py-2">3 compras</td>
						<td class="border px-4 py-2">2023-05-15</td>
						<td class="border px-4 py-2">8</td>
						<td class="border px-4 py-2">$150.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">3</td>
						<td class="border px-4 py-2">3456789012</td>
						<td class="border px-4 py-2">Carlos García</td>
						<td class="border px-4 py-2">10 compras</td>
						<td class="border px-4 py-2">2023-04-22</td>
						<td class="border px-4 py-2">20</td>
						<td class="border px-4 py-2">$300.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<!-- Agrega más filas aquí -->
					<tr>
						<td class="border px-4 py-2">4</td>
						<td class="border px-4 py-2">4567890123</td>
						<td class="border px-4 py-2">Ana González</td>
						<td class="border px-4 py-2">7 compras</td>
						<td class="border px-4 py-2">2023-06-05</td>
						<td class="border px-4 py-2">15</td>
						<td class="border px-4 py-2">$250.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">5</td>
						<td class="border px-4 py-2">5678901234</td>
						<td class="border px-4 py-2">Pedro Martínez</td>
						<td class="border px-4 py-2">4 compras</td>
						<td class="border px-4 py-2">2023-05-20</td>
						<td class="border px-4 py-2">10</td>
						<td class="border px-4 py-2">$180.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">6</td>
						<td class="border px-4 py-2">6789012345</td>
						<td class="border px-4 py-2">Laura Ruiz</td>
						<td class="border px-4 py-2">6 compras</td>
						<td class="border px-4 py-2">2023-04-10</td>
						<td class="border px-4 py-2">12</td>
						<td class="border px-4 py-2">$220.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">7</td>
						<td class="border px-4 py-2">7890123456</td>
						<td class="border px-4 py-2">Miguel Hernández</td>
						<td class="border px-4 py-2">9 compras</td>
						<td class="border px-4 py-2">2023-05-30</td>
						<td class="border px-4 py-2">25</td>
						<td class="border px-4 py-2">$400.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">8</td>
						<td class="border px-4 py-2">8901234567</td>
						<td class="border px-4 py-2">Sofía Ramírez</td>
						<td class="border px-4 py-2">2 compras</td>
						<td class="border px-4 py-2">2023-06-10</td>
						<td class="border px-4 py-2">5</td>
						<td class="border px-4 py-2">$100.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">9</td>
						<td class="border px-4 py-2">9012345678</td>
						<td class="border px-4 py-2">Diego Torres</td>
						<td class="border px-4 py-2">8 compras</td>
						<td class="border px-4 py-2">2023-06-02</td>
						<td class="border px-4 py-2">18</td>
						<td class="border px-4 py-2">$320.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">10</td>
						<td class="border px-4 py-2">0123456789</td>
						<td class="border px-4 py-2">Elena Vega</td>
						<td class="border px-4 py-2">1 compra</td>
						<td class="border px-4 py-2">2023-04-18</td>
						<td class="border px-4 py-2">3</td>
						<td class="border px-4 py-2">$60.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">11</td>
						<td class="border px-4 py-2">1123456789</td>
						<td class="border px-4 py-2">Luis Silva</td>
						<td class="border px-4 py-2">4 compras</td>
						<td class="border px-4 py-2">2023-06-12</td>
						<td class="border px-4 py-2">14</td>
						<td class="border px-4 py-2">$260.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">12</td>
						<td class="border px-4 py-2">2123456789</td>
						<td class="border px-4 py-2">Jorge Morales</td>
						<td class="border px-4 py-2">11 compras</td>
						<td class="border px-4 py-2">2023-05-07</td>
						<td class="border px-4 py-2">22</td>
						<td class="border px-4 py-2">$360.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">13</td>
						<td class="border px-4 py-2">3123456789</td>
						<td class="border px-4 py-2">Natalia Gómez</td>
						<td class="border px-4 py-2">9 compras</td>
						<td class="border px-4 py-2">2023-04-30</td>
						<td class="border px-4 py-2">20</td>
						<td class="border px-4 py-2">$340.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">14</td>
						<td class="border px-4 py-2">4123456789</td>
						<td class="border px-4 py-2">Ricardo Ortega</td>
						<td class="border px-4 py-2">3 compras</td>
						<td class="border px-4 py-2">2023-05-10</td>
						<td class="border px-4 py-2">6</td>
						<td class="border px-4 py-2">$120.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">15</td>
						<td class="border px-4 py-2">5123456789</td>
						<td class="border px-4 py-2">Lucía Castillo</td>
						<td class="border px-4 py-2">2 compras</td>
						<td class="border px-4 py-2">2023-06-15</td>
						<td class="border px-4 py-2">8</td>
						<td class="border px-4 py-2">$160.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">16</td>
						<td class="border px-4 py-2">6123456789</td>
						<td class="border px-4 py-2">Rafael Luna</td>
						<td class="border px-4 py-2">12 compras</td>
						<td class="border px-4 py-2">2023-04-25</td>
						<td class="border px-4 py-2">30</td>
						<td class="border px-4 py-2">$500.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">17</td>
						<td class="border px-4 py-2">7123456789</td>
						<td class="border px-4 py-2">Isabel Reyes</td>
						<td class="border px-4 py-2">5 compras</td>
						<td class="border px-4 py-2">2023-06-18</td>
						<td class="border px-4 py-2">12</td>
						<td class="border px-4 py-2">$220.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">18</td>
						<td class="border px-4 py-2">8123456789</td>
						<td class="border px-4 py-2">Fernando Torres</td>
						<td class="border px-4 py-2">3 compras</td>
						<td class="border px-4 py-2">2023-05-22</td>
						<td class="border px-4 py-2">5</td>
						<td class="border px-4 py-2">$100.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">19</td>
						<td class="border px-4 py-2">9123456789</td>
						<td class="border px-4 py-2">Valeria Rojas</td>
						<td class="border px-4 py-2">4 compras</td>
						<td class="border px-4 py-2">2023-06-08</td>
						<td class="border px-4 py-2">8</td>
						<td class="border px-4 py-2">$160.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">20</td>
						<td class="border px-4 py-2">1012345678</td>
						<td class="border px-4 py-2">Alejandro Sánchez</td>
						<td class="border px-4 py-2">7 compras</td>
						<td class="border px-4 py-2">2023-05-17</td>
						<td class="border px-4 py-2">10</td>
						<td class="border px-4 py-2">$200.00</td>
						<td class="border px-4 py-2">
							<button
								class="bg-blue-500 text-white px-2 py-1 rounded"
								>Editar</button
							>
							<button
								class="bg-red-500 text-white px-2 py-1 rounded"
								>Desactivar</button
							>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- view mobile -->
	<div class=" md:hidden container p-4 pl-10 border w-full mx-auto">
		<table class="table-auto w-full">
			<tbody>
				<tr class=" border-b border-gray-300">
					<td class="py-4">
						<div class="">
							<p class="text-lg">102546951</p>
							<p class="text-gray-400 text-20px">$250.600</p>
						</div>
					</td>
				</tr>
				<tr class="border-b border-gray-300 w-full">
					<td class="py-4">
						<div class="">
							<p class="text-lg">102546952</p>
							<p class="text-gray-400 text-20px">$350.700</p>
						</div>
					</td>
				</tr>
				<tr class=" border-b border-gray-300">
					<td class="py-4">
						<div class="">
							<p class="text-lg">102546953</p>
							<p class="text-gray-400 text-20px">$450.800</p>
						</div>
					</td>
				</tr>
				<tr class=" border-b border-gray-300">
					<td class="py-4">
						<div class="">
							<p class="text-lg">102546954</p>
							<p class="text-gray-400 text-20px">$550.900</p>
						</div>
					</td>
				</tr>
				<tr class=" border-b border-gray-300">
					<td class="py-4">
						<div class="">
							<p class="text-lg">102546955</p>
							<p class="text-gray-400 text-20px">$650.000</p>
						</div>
					</td>
				</tr>
				<tr class=" border-b border-gray-300">
					<td class="py-4">
						<div class="">
							<p class="text-lg">102546956</p>
							<p class="text-gray-400 text-20px">$750.100</p>
						</div>
					</td>
				</tr>
				<tr class=" border-b border-gray-300">
					<td class="py-4">
						<div class="">
							<p class="text-lg">102546957</p>
							<p class="text-gray-400 text-20px">$850.200</p>
						</div>
					</td>
				</tr>
				<tr class=" border-b border-gray-300">
					<td class="py-4">
						<div class="">
							<p class="text-lg">102546958</p>
							<p class="text-gray-400 text-20px">$950.300</p>
						</div>
					</td>
				</tr>
				<tr class=" border-b border-gray-300">
					<td class="py-4">
						<div class="">
							<p class="text-lg">102546959</p>
							<p class="text-gray-400 text-20px">$1.050.400</p>
						</div>
					</td>
				</tr>
				<tr class=" border-b border-gray-300">
					<td class="py-4">
						<div class="">
							<p class="text-lg">102546960</p>
							<p class="text-gray-400 text-20px">$1.150.500</p>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</section>
