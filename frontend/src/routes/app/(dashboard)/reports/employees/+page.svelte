<!--<script>
	import { onMount } from "svelte";
	import {
		employees,
		loadEmployees,
		loading,
		error,
	} from "../../../../../stores/models";

	onMount(() => {
		console.log("Calling loadEmployees...");
		loadEmployees();
	});
</script>
-->

<!-- th: columns, tr:cells -->
<!--{#if $loading}
	<p>Loading data...</p>
{:else if $employees && $employees.length > 0}
	<section>
		<h2>EMPLOYEES</h2>
		<table
			class="table-auto border-collapse border border-gray-300 w-full text-left text-sm"
		>
			<thead>
				<tr class="bg-gray-100">
					<th class="border border-gray-300 px-4 py-2">ID</th>
					<th class="border border-gray-300 px-4 py-2">Rol</th>
					<th class="border border-gray-300 px-4 pt-2">Name</th>
					<th class="border border-gray-300 px-4 py-2">Phone</th>
					<th class="border border-gray-300 px-4 py-2">Email</th>
					<th class="border border-gray-300 px-4 py-2">Salary</th>
					<th class="border border-gray-300 px-4 py-2"
						>Bank_account</th
					>
					<th class="border border-gray-300 px-4 py-2"
						>Branch_store</th
					>
					<th class="border border-gray-300 px-4 py-2">Status</th>
				</tr>
			</thead>
			<tbody>
				{#each $employees as employee}
					<tr class="hover:bg-gray-50">
						<td class="border border-gray-300 px-4 py-2"
							>{employee.id}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{employee.rol}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{employee.name}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{employee.phone}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{employee.email}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{employee.salary}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{employee.bank_account_number}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{employee.branch_store_id}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{employee.status}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
		<ul></ul>
	</section>
{:else if $error}
	<p class="text-red-400">{$error}</p>
{:else}
	<p>No employees found.</p>
{/if}



-->

<script>
	import { onMount } from "svelte";
	import { loadData } from "../../../../../utils/models";
	import { employees } from "../../../../../stores/models";
	import SearchBar from "../../../../../components/SearchBar.svelte";
	import Table from "../../../../../components/Table.svelte";

	let filters = { id: null, status: null, all: true };

	const handleSearch = async (event) => {
		filters = event.detail.filters;

		if (filters.id) {
			await loadData("employees", "byId", filters);
		} else if (filters.status !== null && filters.status !== undefined) {
			await loadData("employees", "byStatus", filters);
		} else if (filters.name) {
			await loadData("employees", "byName", filters);
		} else {
			await loadData("employees", "all", filters);
		}
	};

	// Cargar productos al montar la vista
	onMount(async () => {
		await loadData("employees", "all", filters);
	});

	// Definir columnas específicas para productos
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

<h5 class="right-20 absolute mt-16 font-medium">Employees</h5>

<!-- MODIFICAR POR CADA VISTA PARA LOS FILTROS PESONALIZADOS-->
<SearchBar
	bind:filters
	on:search={handleSearch}
	searchFields={["id", "status"]}
/>

<!-- Usar el componente Table con columnas y datos -->
<Table {columns} data={$employees} />
