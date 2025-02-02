<script>
	import { onMount } from "svelte";
	import {
		customer,
		loadCustomers,
		loading,
		error,
	} from "../../../../stores/models";

	onMount(() => {
		console.log("Calling load customers...");
		loadCustomers();
	});
</script>

<!-- th: columns, tr:cells -->
{#if $loading}
	<p>Loading data...</p>
{:else if $customer && $customer.length > 0}
	<section>
		<h2>CUSTOMERS</h2>
		<table
			class="table-auto border-collapse border border-gray-300 w-full text-left text-sm"
		>
			<thead>
				<tr class="bg-gray-100">
					<th class="border border-gray-300 px-4 py-2">ID</th>
					<th class="border border-gray-300 px-4 py-2"
						>Identification card</th
					>
					<th class="border border-gray-300 px-4 pt-2"
						>Customer invoice</th
					>
				</tr>
			</thead>
			<tbody>
				{#each $customer as customer}
					<tr class="hover:bg-gray-50">
						<td class="border border-gray-300 px-4 py-2"
							>{customer.id}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{customer.identification_card}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{customer.customer_invoice}</td
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
	<p>No customers found.</p>
{/if}
