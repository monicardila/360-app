<script>
	import FormCreateUpdate from "./FormCreateUpdate.svelte";
	import { loadData, updateModel } from "../utils/models";

	export let columns = [];
	export let data = [];
	export let resourceName = ""; // <-- Ej: "products"
	export let fieldSchema = []; // <-- campos como los de fieldSchemas.products
	export let hideActions = false; // Por defecto muestra las acciones

	let showEditForm = false;
	let selectedModel = {};

	async function handleEdit(id) {
		await loadData(resourceName, "byId", { id });
		const selected = data.find((item) => item.id === id);
		selectedModel = selected;
		showEditForm = true;
	}

	async function handleUpdate(updatedData) {
		await updateModel(resourceName, updatedData.id, updatedData);
		await loadData(resourceName, "all", { includeProducts: true });
		showEditForm = false;
	}
</script>

<div class="overflow-x-auto max-w-[1500px] m-auto bg-white">
	{#if showEditForm}
		<FormCreateUpdate
			fields={fieldSchema}
			model={selectedModel}
			submitLabel="Actualizar"
			on:submit={(e) => handleUpdate(e.detail)}
			on:close={() => (showEditForm = false)}
		/>
	{/if}

	{#if data.length > 0}
		<div class="overflow-y-auto max-h-[500px]">
			<table
				class="table-auto border-collapse border border-gray-300 w-full text-left text-sm min-w-full"
			>
				<thead class="sticky top-0 z-10 bg-white">
					<tr class="bg-cyan-600 text-white">
						{#each columns as col}
							<th class="border border-gray-300 px-4 py-2"
								>{col}</th
							>
						{/each}
						{#if !hideActions}
							<th
								class="border border-gray-300 px-4 py-2 text-center"
								>Acciones</th
							>
						{/if}
					</tr>
				</thead>
				<tbody>
					{#each data as row}
						<tr class="hover:bg-gray-50">
							{#each columns as col}
								<td class="border border-gray-300 px-4 py-2">
									{#if Array.isArray(row[col])}
										{#if col === "customer_invoice"}
											<details class="cursor-pointer">
												<summary
													class="text-blue-600 underline"
													>Ver productos</summary
												>
												{#if row[col].length > 0 && row[col].some((i) => i.invoice_content_customer?.length > 0)}
													<ul class="ml-4 list-disc">
														{#each row[col] as invoice}
															{#each invoice.invoice_content_customer as content}
																<li>
																	{content
																		.products
																		?.name ??
																		content.product_name ??
																		"Sin nombre"}
																</li>
															{/each}
														{/each}
													</ul>
												{:else}
													<p
														class="ml-4 text-gray-500 italic"
													>
														Sin compras
													</p>
												{/if}
											</details>
										{:else}
											<!-- para otros arrays normales -->
											<details class="cursor-pointer">
												<summary
													class="text-blue-600 underline"
													>Ver lista</summary
												>
												<ul class="ml-4 list-disc">
													{#each row[col] as item}
														<li>
															{item.id} - {item.name}
														</li>
													{/each}
												</ul>
											</details>
										{/if}
									{:else}
										{row[col]}
									{/if}
								</td>
							{/each}

							{#if !hideActions}
								<td
									class="border border-gray-300 px-4 py-2 text-center"
								>
									<button
										class="text-blue-600 hover:text-blue-800 mr-2"
										on:click={() => handleEdit(row.id)}
										title="Editar">✏️</button
									>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p class="text-center p-4">No hay datos disponibles.</p>
	{/if}
</div>
