<script>
	export let columns = []; // Array de nombres de columnas
	export let data = []; // Array de objetos con los datos
</script>

<div class="overflow-x-auto max-w-[1500px] m-auto bg-white">
	{#if data.length > 0}
		<table
			class="table-auto border-collapse border border-gray-300 w-full text-left text-sm"
		>
			<thead>
				<tr class="bg-cyan-600 text-white">
					{#each columns as col}
						<th class="border border-gray-300 px-4 py-2">{col}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as row}
					<tr class="hover:bg-gray-50">
						{#each columns as col}
							<td class="border border-gray-300 px-4 py-2"
								>{row[col]}</td
							>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p class="text-center p-4">No data available.</p>
	{/if}
</div>
