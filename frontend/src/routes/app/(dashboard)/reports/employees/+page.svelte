<script>
	import { onMount } from "svelte";
	import { employees, branch_store } from "../../../../../stores/models";
	import { loadData, createModel } from "../../../../../utils/models";

	import SearchBar from "../../../../../components/SearchBar.svelte";
	import Table from "../../../../../components/Table.svelte";
	import FormCreateUpdate from "../../../../../components/FormCreateUpdate.svelte";
	import { fieldSchemas } from "../../../../../utils/fieldsSchema";

	let filters = { id: null, status: null, name: "", all: true };
	let showForm = false;
	let employeeFields = [];

	onMount(async () => {
		await Promise.all([
			loadData("employees", "all", filters),
			loadData("branch_store", "all"),
		]);

		employeeFields = fieldSchemas.employees.map((field) => {
			if (field.name === "branch_store_id") {
				return {
					...field,
					options: $branch_store.map((b) => ({
						id: b.id,
						name: b.name,
					})),
				};
			}
			return field;
		});
	});

	const handleSearch = async (event) => {
		filters = event.detail.filters;
		const isEmpty = Object.values(filters).every(
			(value) => value === null || value === "",
		);

		if (isEmpty) {
			await loadData("employees", "all", filters);
		} else if (filters.id) {
			await loadData("employees", "byId", filters);
		} else if (filters.status !== null && filters.status !== undefined) {
			await loadData("employees", "byStatus", filters);
		} else if (filters.name) {
			await loadData("employees", "byName", filters);
		} else {
			await loadData("employees", "all", filters);
		}
	};

	async function handleCreate(event) {
		const data = event.detail;

		if (
			!data.name ||
			!data.identification_card ||
			!data.email ||
			!data.salary ||
			!data.branch_store_id
		) {
			alert("Por favor completa todos los campos obligatorios.");
			return;
		}

		try {
			await createModel("employees", data);
			await loadData("employees", "all", filters);
			showForm = false;
		} catch (error) {
			console.error("Error al crear empleado:", error);
			alert("Error al crear empleado");
		}
	}

	function openForm() {
		showForm = true;
	}

	const columns = [
		"id",
		"identification_card",
		"rol",
		"name",
		"phone",
		"email",
		"salary",
		"bank_account_number",
		"status",
		"branch_store_id",
	];
</script>

<div class="relative w-auto h-screen pt-10">
	{#if showForm}
		<FormCreateUpdate
			fields={employeeFields}
			on:submit={handleCreate}
			submitLabel="Crear empleado"
			on:close={() => (showForm = false)}
		/>
	{/if}

	<div class=" w-auto border">
		<h5 class="right-10 absolute mt-16 font-medium hidden xl:block">
			Empleados
		</h5>
		<SearchBar
			bind:filters
			on:search={handleSearch}
			searchFields={["id", "status"]}
		/>

		<button
			on:click={openForm}
			class="fixed bottom-6 right-6 z-50 bg-green-600 text-white text-3xl w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-green-700 transition"
			aria-label="Crear nuevo empleado"
		>
			+
		</button>

		<Table
			{columns}
			data={$employees}
			resourceName="employees"
			fieldSchema={employeeFields}
		/>
	</div>
</div>
