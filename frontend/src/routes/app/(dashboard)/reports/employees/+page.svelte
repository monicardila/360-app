<script>
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

<!-- th: columns, tr:cells -->
{#if $loading}
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
