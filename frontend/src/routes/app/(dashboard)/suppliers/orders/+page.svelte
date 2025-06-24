<script>
	import { onMount } from "svelte";
	import {
		orders,
		employees,
		supplier,
		products,
	} from "../../../../../stores/models";

	import SearchBar from "../../../../../components/SearchBar.svelte";
	import Table from "../../../../../components/Table.svelte";
	import FormCreateUpdate from "../../../../../components/FormCreateUpdate.svelte";
	import { fieldSchemas } from "../../../../../utils/fieldsSchema";
	import { createModel, loadData } from "../../../../../utils/models";

	let filters = { id: null, delivery_status: null, all: true };
	let showForm = false;
	let orderFields = [];

	// Al montar, carga órdenes y relaciones necesarias
	onMount(async () => {
		await Promise.all([
			loadData("orders", "all", filters),
			loadData("employees", "all"),
			loadData("supplier", "all"),
			loadData("products", "all"),
		]);

		// Mapear dinámicamente los campos relacionales
		orderFields = fieldSchemas.orders.map((field) => {
			if (field.name === "supplier_nit") {
				return {
					...field,
					options: $supplier.map((s) => ({
						id: s.nit,
						name: `${s.name} (${s.nit})`,
					})),
				};
			}
			if (field.name === "employees_identification_card") {
				return {
					...field,
					options: $employees.map((e) => ({
						id: e.identification_card,
						name: `${e.name} (${e.identification_card})`,
					})),
				};
			}
			if (field.name === "product_name") {
				return {
					...field,
					options: $products.map((p) => ({
						id: p.name,
						name: `${p.name} ($${p.price})`,
					})),
				};
			}
			return field;
		});
	});

	// Búsqueda
	const handleSearch = async (event) => {
		filters = event.detail.filters;
		console.log("filtros-----------------------------: ", filters);
		const isEmpty = Object.values(filters).every(
			(value) => value === null || value === "",
		);

		if (isEmpty) {
			await loadData("orders", "all", filters);
		} else if (filters.id) {
			await loadData("orders", "byId", filters);
		} else if (filters.delivery_status) {
			await loadData("orders", "byStatus", filters);
		} else {
			await loadData("orders", "all", filters);
		}
	};

	// Crear orden
	async function handleCreate(event) {
		const data = event.detail;

		if (
			!data.order_date ||
			!data.supplier_nit ||
			!data.product_name ||
			!data.employees_identification_card
		) {
			alert("Por favor completa todos los campos obligatorios.");
			return;
		}

		try {
			await createModel("orders", data);
			await loadData("orders", "all", filters);
			showForm = false;
		} catch (error) {
			console.error("Error al crear orden:", error);
			alert("Error al crear orden");
		}
	}

	function openForm() {
		showForm = true;
	}
</script>

<!-- Vista de Orders -->
<div class="relative w-auto">
	{#if showForm}
		<FormCreateUpdate
			fields={orderFields}
			on:submit={handleCreate}
			submitLabel="Crear orden"
			on:close={() => (showForm = false)}
		/>
	{/if}

	<div class="mt-24 w-auto border">
		<SearchBar
			bind:filters
			on:search={handleSearch}
			searchFields={["id", "delivery_status"]}
		/>

		<button
			on:click={openForm}
			class="fixed bottom-6 right-6 z-50 bg-green-600 text-white text-3xl w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-green-700 transition"
			aria-label="Crear nueva orden"
		>
			+
		</button>

		<Table
			columns={[
				"id",
				"order_date",
				"supplier_nit",
				"employees_identification_card",
				"product_name",
				"delivery_status",
			]}
			data={$orders}
			resourceName="orders"
			fieldSchema={orderFields}
		/>
	</div>
</div>
