<script>
	import { onMount } from "svelte";
	import { loadData, createModel } from "../../../../../utils/models";
	import { branch_store } from "../../../../../stores/models";

	import SearchBar from "../../../../../components/SearchBar.svelte";
	import Table from "../../../../../components/Table.svelte";
	import FormCreateUpdate from "../../../../../components/FormCreateUpdate.svelte";
	import { fieldSchemas } from "../../../../../utils/fieldsSchema";

	let filters = { id: null, status: null, name: "", all: true };
	let showForm = false;
	let branchFields = [];

	onMount(async () => {
		await loadData("branch_store", "all", filters);

		branchFields = fieldSchemas.branchStore.map((field) => field);
	});

	const handleSearch = async (event) => {
		filters = event.detail.filters;

		const isEmpty = Object.values(filters).every(
			(value) => value === null || value === "",
		);

		if (isEmpty) {
			await loadData("branch_store", "all", filters);
		} else if (filters.id) {
			await loadData("branch_store", "byId", filters);
		} else if (filters.status !== null && filters.status !== undefined) {
			await loadData("branch_store", "byStatus", filters);
		} else if (filters.name) {
			await loadData("branch_store", "byName", filters);
		} else {
			await loadData("branch_store", "all", filters);
		}
	};

	async function handleCreate(event) {
		const data = event.detail;

		if (
			!data.name ||
			!data.address ||
			!data.manager_name ||
			!data.number_of_employees
		) {
			alert("Por favor completa todos los campos obligatorios.");
			return;
		}

		try {
			await createModel("branch_store", data);
			await loadData("branch_store", "all", filters);
			showForm = false;
		} catch (error) {
			console.error("Error al crear sucursal:", error);
			alert("Error al crear sucursal");
		}
	}

	function openForm() {
		showForm = true;
	}

	const columns = [
		"id",
		"name",
		"address",
		"manager_name",
		"number_of_employees",
		"status",
	];
</script>

<!-- Vista -->
<div class="relative w-auto">
	{#if showForm}
		<FormCreateUpdate
			fields={branchFields}
			on:submit={handleCreate}
			submitLabel="Crear sucursal"
			on:close={() => (showForm = false)}
		/>
	{/if}

	<div class="mt-24 w-auto border">
		<SearchBar
			bind:filters
			on:search={handleSearch}
			searchFields={["id", "status"]}
		/>

		<button
			on:click={openForm}
			class="fixed bottom-6 right-6 z-50 bg-green-600 text-white text-3xl w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-green-700 transition"
			aria-label="Crear nueva sucursal"
		>
			+
		</button>

		<Table
			{columns}
			data={$branch_store}
			resourceName="branch_store"
			fieldSchema={branchFields}
		/>
	</div>
</div>
