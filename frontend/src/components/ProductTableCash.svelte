<!-- Componente específico para la caja registradora. tabla de productos izquierda -->
<!-- FLUJO: 
1. Usuario hace clic en una fila del hijo.
2. El hijo llama a dispatch("select", product) (ese producto es el seleccionado).
3. El padre escucha ese evento con on:select.
4. El padre recibe el evento y accede al producto con event.detail. -->

<script>
	// Importa el dispatcher de eventos de Svelte
	import { createEventDispatcher } from "svelte";

	// función de Svelte que se usa en componentes hijos para enviar información al componente padre
	const dispatch = createEventDispatcher();

	// Props
	export let columns = []; // nombres de columnas
	export let data = []; // datos para mostrar en la tabla

	// Cuando se da clic en una fila, se dispara un evento personalizado
	function handleRowClick(product) {
		dispatch("select", product); // emite evento 'select' con el producto
		console.log("PRODUCTO SELECCIONADO", product);
	}
</script>

<!-- Tabla responsiva -->
<div class="overflow-x-auto max-w-[1500px] m-auto bg-white">
	{#if data.length > 0}
		<div class="overflow-y-auto max-h-[500px]">
			<table
				class="table-auto border-collapse border border-gray-300 w-full text-left text-sm min-w-full"
			>
				<thead class="sticky top-0 z-10 bg-white">
					<tr class="bg-cyan-600 text-white">
						{#each columns as col}
							<th class="border border-gray-300 px-4 py-2">
								{col}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each data as row}
						<tr
							class="hover:bg-gray-100 cursor-pointer"
							on:click={() => handleRowClick(row)}
						>
							{#each columns as col}
								<td class="border border-gray-300 px-4 py-2">
									{row[col]}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p class="text-center p-4">No data available.</p>
	{/if}
</div>
