<script>
	import { createEventDispatcher } from "svelte";
	import { loading, error } from "../stores/shared";

	const dispatch = createEventDispatcher();

	export let filters = {
		id: null,
		status: null,
		name: "",
		all: null,
	};

	const handleSearch = () => {
		// object propagation (...) <- research on google
		const processedFilters = {
			id: filters.id ? Number(filters.id) : null,
			status:
				filters.status === "true"
					? true
					: filters.status === "false"
						? false
						: null,
			name: filters.name || undefined,
			all: filters.all !== undefined ? filters.all : null,
		};

		console.log(
			"Processed filters being dispatched SEARCH_BAR:",
			processedFilters,
		);
		console.log("SEARCH BAR type: ", typeof filters.status);

		dispatch("search", { filters: processedFilters });
	};
	const handleClear = () => {
		(filters.id = null), (filters.status = null), (filters.name = "");
	};
</script>

<!-- Search bar -->
<div
	class="mt-24 m-auto flex items-center justify-center space-x-4 max-w-[1500px] py-4 pb-8 bg-white shadow-md rounded-t-lg"
>
	<div class="flex flex-col space-y-2 min-w-[15%]">
		<label for="search-id" class="text-gray-700 font-medium">ID</label>
		<input
			type="number"
			id="search-id"
			bind:value={filters.id}
			placeholder="Search by ID"
			class="text-gray-600 rounded-xl w-44 p-2 h-full pl-10 outline-none bg-slate-100"
		/>
	</div>
	<div class="flex flex-col space-y-2 min-w-[15%]">
		<label for="search-status" class="text-gray-700 font-medium"
			>Status</label
		>
		<select
			id="search-status"
			bind:value={filters.status}
			class="text-gray-600 rounded-xl w-54 p-2 h-full pl-10 outline-none bg-slate-100"
		>
			<option value="">All</option>
			<option value="true">Available</option>
			<option value="false">Unavailable</option>
		</select>
	</div>
	<div class="flex flex-col space-y-2 min-w-[15%]">
		<label for="filters" class="text-gray-700 font-medium">Name</label>
		<input
			type="text"
			id="search-id"
			bind:value={filters.name}
			placeholder="Search by ID"
			class="text-gray-600 rounded-xl w-44 p-2 h-full pl-10 outline-none bg-slate-100"
		/>
	</div>
	<div class="flex flex-col space-y-2 min-w-[15%]">
		<label for="category" class="text-gray-700 font-medium">Category</label>
		<select
			id="category"
			class="bg-slate-100 text-gray-600 rounded-xl w-54 p-2 h-full pl-10 px-6 outline-none"
		>
			<option value="">Food</option>
			<option value="">Home</option>
			<option value="">Health</option>
			<option value="">Phones</option>
		</select>
	</div>
	<div class="flex flex-col space-y-2 min-w-[15%]">
		<label for="price" class="text-gray-700 font-medium">Price</label>
		<select
			id="price"
			class="bg-slate-100 text-gray-600 rounded-xl w-54 p-2 h-full pl-10 outline-none"
		>
			<option value="">Greater</option>
			<option value="">Lesser</option>
		</select>
	</div>
	<button
		on:click={handleSearch}
		class="border-2 border-slate-300 bg-cyan-600 text-white rounded-xl p-3 px-6 mt-8 font-medium"
		disabled={$loading}
	>
		{$loading ? "Loading..." : "Search"}
	</button>

	<button
		on:click={handleClear}
		class="border-2 font-semibold border-slate-300 bg-red-300 text-white rounded-xl p-3 px-6 mt-8"
		>Clean</button
	>
</div>

<!-- search menu -->

<!-- <script>

	let filter = {id:"", status:"", }

	let searchText = "";
	let searchInput = "";

	const handleClear = () => {
		searchText = "";
		loadProducts();
		searchInput.focus();
	};
	const handleSearch = () => {
		loadProductsById(searchText);
	};
</script> -->
<!-- <div class="">
	<input
		bind:value={searchText}
		bind:this={searchInput}
		placeholder="Search by id"
		class="border border-gray-400 text-gray-600 rounded-full w-36 p-4 h-full pl-10 pr-6 outline-none"
		type="text"
	/>
	<button on:click={handleSearch} class="border border-black bg-green-300"
		>Search</button
	>
	<button on:click={handleClear} class="border border-black bg-green-300"
		>All products</button
	>
</div>

{#if $loading}
	<p>Loading...</p>
{:else if $error}
	<p>Error: {$error}</p>
{:else if $products.length === 0}
	<p>No products found</p>
{:else}
	<ul>
		{#each $products as product}
			<li>{product.id} - {product.name}</li>
		{/each}
	</ul>
{/if} -->

<!-- antes-------------------------- -->
<!-- 
import { loading, error } from "../stores/shared";
import { products, customers, suppliers, branchStores, orders } from "../stores/models";
import api from "../api";

// Mapeo de tipos a stores y funciones
const modelConfig = {
  products: { store: products, fetcher: api.getByIdProducts },
  customers: { store: customers, fetcher: api.getByIdCustomers },
  suppliers: { store: suppliers, fetcher: api.getByIdSuppliers },
  branchStores: { store: branchStores, fetcher: api.getByIdBranchStores },
  orders: { store: orders, fetcher: api.getByIdOrders },
  // Agrega más modelos aquí
};

-->

<!-- componente:-----------------

<script>
  import { loadData, products } from "../stores/models";

  let filters = { id: "", status: "", name: "" }; // Almacena los valores de los filtros
  let operation = "all"; // Operación por defecto

  const searchProducts = async () => {
    // Determina el tipo de operación basado en el filtro elegido
    if (filters.id) {
      operation = "byId";
    } else if (filters.status) {
      operation = "byStatus";
    } else if (filters.name) {
      operation = "byName";
    } else {
      operation = "all"; // Si no hay filtros, carga todo
    }

    // Llama a la función genérica para cargar los datos
    await loadData("products", operation, filters);
  };
</script>

<div>
  <input
    bind:value={filters.id}
    placeholder="Search by ID"
    class="border p-2"
  />
  <input
    bind:value={filters.status}
    placeholder="Search by Status"
    class="border p-2"
  />
  <input
    bind:value={filters.name}
    placeholder="Search by Name"
    class="border p-2"
  />
  <button
    on:click={searchProducts}
    class="border p-2 bg-blue-500 text-white"
  >
    Search
  </button>
</div>

<ul>
  {#each $products as product}
    <li>{product.id} - {product.name} ({product.status})</li>
  {/each}
</ul>


models.js-------------------

const modelConfig = {
	products: {
	  store: products,
	  fetchers: {
		all: api.getAllProducts,
		byId: api.getByIdProducts,
		byStatus: api.getStatusProducts, // Supongamos que esta existe
		// Agrega más operaciones aquí si es necesario
	  },
	},
	customers: {
	  store: customers,
	  fetchers: {
		all: api.getAllCustomers,
		byId: api.getByIdCustomers,
		byStatus: api.getStatusCustomers, // Supongamos que esta existe
	  },
	},
	suppliers: {
	  store: suppliers,
	  fetchers: {
		all: api.getAllSuppliers,
		byId: api.getByIdSuppliers,
	  },
	},
	// Agrega más modelos aquí
  };

export async function loadData(type, operation = "all", filters = {}) {
  try {
    loading.set(true);
    error.set(null);

    // Verifica si el tipo existe en el mapa
    const config = modelConfig[type];
    if (!config) {
      throw new Error(`Tipo de modelo no reconocido: ${type}`);
    }

    const { store, fetchers } = config;

    // Verifica si la operación es válida
    const fetcher = fetchers[operation];
    if (!fetcher) {
      throw new Error(`Operación no soportada: ${operation}`);
    }

    // Llama a la función del API con los filtros adecuados
    const response = await fetcher(filters.id || filters);
    store.set(Array.isArray(response.data) ? response.data : [response.data]); // Normaliza el formato
  } catch (err) {
    error.set(err.message || "Error desconocido");
    if (modelConfig[type]) {
      modelConfig[type].store.set([]); // Limpia el store en caso de error
    }
  } finally {
    loading.set(false);
  }
}


   -->
