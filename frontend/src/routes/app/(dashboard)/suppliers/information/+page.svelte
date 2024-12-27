<script>
	import { onMount } from "svelte";
	import {
		supplier,
		loadSupplier,
		loading,
		error,
	} from "../../../../../stores/models";

	onMount(() => {
		console.log("Calling load supplier...");
		loadSupplier();
	});
</script>

<!-- th: columns, tr:cells -->
{#if $loading}
	<p>Loading data...</p>
{:else if $supplier && $supplier.length > 0}
	<section>
		<h2>SUPPLIERS</h2>
		<table
			class="table-auto border-collapse border border-gray-300 w-full text-left text-sm"
		>
			<thead>
				<tr class="bg-gray-100">
					<th class="border border-gray-300 px-4 py-2">ID</th>
					<th class="border border-gray-300 px-4 py-2">Nit</th>
					<th class="border border-gray-300 px-4 pt-2">Name</th>
					<th class="border border-gray-300 px-4 py-2"
						>Contact name</th
					>
					<th class="border border-gray-300 px-4 py-2">Email</th>
					<th class="border border-gray-300 px-4 py-2">Phone</th>
					<th class="border border-gray-300 px-4 py-2">Address</th>
					<th class="border border-gray-300 px-4 py-2">Status</th>
					<th class="border border-gray-300 px-4 py-2"
						>Deactivated at</th
					>
				</tr>
			</thead>
			<tbody>
				{#each $supplier as supplier}
					<tr class="hover:bg-gray-50">
						<td class="border border-gray-300 px-4 py-2"
							>{supplier.id}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{supplier.nit}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{supplier.name}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{supplier.contact_name}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{supplier.email}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{supplier.phone}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{supplier.address}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{supplier.status}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{supplier.deactivatedAt}</td
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
	<p>No suppliers found.</p>
{/if}
