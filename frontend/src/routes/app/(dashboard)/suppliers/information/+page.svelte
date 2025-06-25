<script>
	import { onMount } from "svelte";
	import { products, supplier } from "../../../../../stores/models";
	import SearchBar from "../../../../../components/SearchBar.svelte";
	import Table from "../../../../../components/Table.svelte";
	import FormCreateUpdate from "../../../../../components/FormCreateUpdate.svelte";
	import { fieldSchemas } from "../../../../../utils/fieldsSchema";
	import { createModel, loadData } from "../../../../../utils/models";

	let filters = { id: null, status: null, all: true };
	let showForm = false;
	let supplierFields = [];

	// Al montar, carga los proveedores
	onMount(async () => {
		await loadData("supplier", "all", { includeProducts: true });

		// Cargar campos desde schema
		supplierFields = fieldSchemas.suppliers;
	});

	// Buscar proveedores según filtros
	const handleSearch = async (event) => {
		filters = event.detail.filters;

		const isEmpty = Object.values(filters).every(
			(value) => value === null || value === "",
		);

		const options = { ...filters, includeProducts: true };

		if (isEmpty) {
			await loadData("supplier", "all", options);
		} else if (filters.id) {
			await loadData("supplier", "byId", options);
		} else if (filters.status !== null && filters.status !== undefined) {
			await loadData("supplier", "byStatus", filters);
		} else if (filters.name) {
			await loadData("supplier", "byName", options);
		} else {
			await loadData("supplier", "all", options);
		}
	};

	// Crear nuevo proveedor
	async function handleCreate(event) {
		const data = event.detail;

		if (!data.name || !data.nit || !data.email) {
			alert("Por favor completa los campos obligatorios.");
			return;
		}

		try {
			await createModel("supplier", data);
			await loadData("supplier", "all", filters);
			showForm = false;
		} catch (error) {
			console.error("Error al crear proveedor:", error);
			alert("Error al crear proveedor");
		}
	}

	function openForm() {
		showForm = true;
	}

	console.log("content supplier: ", supplierFields);
</script>

<!-- Vista de Suppliers -->
<div class="relative w-auto h-screen pt-10">
	{#if showForm}
		<FormCreateUpdate
			fields={supplierFields}
			on:submit={handleCreate}
			submitLabel="Crear proveedor"
			on:close={() => (showForm = false)}
		/>
	{/if}

	<div class="w-auto border">
		<h5 class="right-10 absolute mt-16 font-medium hidden xl:block">
			Proveedores
		</h5>
		<SearchBar
			bind:filters
			on:search={handleSearch}
			searchFields={["id", "status", "name"]}
		/>

		<!-- Botón flotante -->
		<button
			on:click={openForm}
			class="fixed bottom-6 right-6 z-50 bg-green-600 text-white text-3xl w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-green-700 transition"
			aria-label="Crear nuevo proveedor"
		>
			+
		</button>

		<Table
			columns={[
				"id",
				"nit",
				"name",
				"contact_name",
				"phone",
				"email",
				"address",
				"status",
				"products",
			]}
			data={$supplier}
			resourceName="supplier"
			fieldSchema={supplierFields}
		/>
	</div>
</div>
