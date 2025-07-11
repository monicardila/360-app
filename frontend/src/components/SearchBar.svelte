<script>
	// Lo que hace SearchBar es emitir un evento con los filtros,
	// y luego handleSearch debería llamar a loadData para actualizar employees

	import { createEventDispatcher } from "svelte";
	import { loading } from "../stores/shared";

	const dispatch = createEventDispatcher();

	// SEGUIR PONIENDO LOS FILTROS DE LAS TABLAS DE PRISMA
	export let filters = {
		id: null,
		status: null,
		name: "",
		category: null,
		price: null,
		rol: null,
		email: null,
		salary: null,
		bank_account_number: null,
		branch_store_id: null,
		nit: null,
		contact_name: null,
		address: null,
		deactivateAt: null,
		delivery_status: null,
	};

	// Nueva prop para definir qué filtros mostrar en cada página
	export let searchFields = [
		"id",
		"status",
		"name",
		"category",
		"price",
		"delivery_status",
	];
	const handleSearch = () => {
		console.log("Filtros antes de procesar:", filters);

		const processedFilters = {}; // <- ¡AQUÍ! Asegúrate de tener esta línea antes del for

		for (const key in filters) {
			if (filters[key] !== null && filters[key] !== "") {
				if (key === "id" || key === "price") {
					processedFilters[key] = Number(filters[key]);
				} else if (key === "status") {
					processedFilters[key] =
						filters[key] === "true"
							? true
							: filters[key] === "false"
								? false
								: null;
				} else if (key === "delivery_status") {
					processedFilters[key] = filters[key]; // Enum en string como "RECIBIDA"
				} else {
					processedFilters[key] = filters[key];
				}
			}
		}

		console.log("Processed filters:", processedFilters);
		dispatch("search", { filters: processedFilters });
	};

	const handleClear = () => {
		for (const key in filters) {
			filters[key] = null;
		}
		dispatch("search", { filters }); // Disparar evento con filtros vacíos
	};

	console.log("Filtros visibles:", searchFields);
</script>

<form
	on:submit|preventDefault={handleSearch}
	class="mt-2 m-auto flex items-center justify-center space-x-4 min-w-[100px]: max-w-[1500px] py-4 pb-8 bg-white shadow-md rounded-t-lg"
>
	{#if searchFields.includes("id")}
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
	{/if}

	{#if searchFields.includes("status")}
		<div class="flex flex-col space-y-2 min-w-[15%]">
			<label for="search-status" class="text-gray-700 font-medium"
				>Estado</label
			>
			<select
				id="search-status"
				bind:value={filters.status}
				class="text-gray-600 rounded-xl w-54 p-2 h-full pl-10 outline-none bg-slate-100"
			>
				<option value="">Todo</option>
				<option value="true">Disponible</option>
				<option value="false">Desactivado</option>
			</select>
		</div>
	{/if}

	{#if searchFields.includes("delivery_status")}
		<div class="flex flex-col space-y-2 min-w-[15%]">
			<label for="delivery_status" class="text-gray-700 font-medium">
				Estado de entrega
			</label>
			<select
				id="delivery_status"
				bind:value={filters.delivery_status}
				class="bg-slate-100 text-gray-600 rounded-xl w-54 p-2 h-full pl-10 px-6 outline-none"
			>
				<option value="">Todos</option>
				<option value="EN_ESPERA">En espera</option>
				<option value="RECIBIDA">Recibida</option>
				<option value="RECHAZADA">Rechazada</option>
				<option value="BORRADOR">Borrador</option>
				<option value="APROBADA">Aprobada</option>
			</select>
		</div>
	{/if}

	{#if searchFields.includes("name")}
		<div class="flex flex-col space-y-2 min-w-[15%]">
			<label for="search-name" class="text-gray-700 font-medium"
				>Nombre</label
			>
			<input
				type="text"
				id="search-name"
				bind:value={filters.name}
				placeholder="Search by Name"
				class="text-gray-600 rounded-xl w-52 p-2 h-full pl-10 outline-none bg-slate-100"
			/>
		</div>
	{/if}

	{#if searchFields.includes("category")}
		<div class="flex flex-col space-y-2 min-w-[15%]">
			<label for="category" class="text-gray-700 font-medium"
				>Category</label
			>
			<select
				id="category"
				bind:value={filters.category}
				class="bg-slate-100 text-gray-600 rounded-xl w-54 p-2 h-full pl-10 px-6 outline-none"
			>
				<option value="">All</option>
				<option value="food">Food</option>
				<option value="home">Home</option>
				<option value="health">Health</option>
				<option value="phones">Phones</option>
			</select>
		</div>
	{/if}

	{#if searchFields.includes("price")}
		<div class="flex flex-col space-y-2 min-w-[15%]">
			<label for="price" class="text-gray-700 font-medium">Price</label>
			<select
				id="price"
				bind:value={filters.price}
				class="bg-slate-100 text-gray-600 rounded-xl w-54 p-2 h-full pl-10 outline-none"
			>
				<option value="">All</option>
				<option value="greater">Greater</option>
				<option value="lesser">Lesser</option>
			</select>
		</div>
	{/if}

	<button
		on:click={handleSearch}
		class="border-2 border-slate-300 bg-cyan-600 text-white rounded-xl p-3 px-6 mt-8 font-medium"
		disabled={$loading}
	>
		{$loading ? "Cargando..." : "Buscar"}
	</button>

	<button
		on:click={handleClear}
		class="border-2 font-semibold border-slate-300 bg-red-300 text-white rounded-xl p-3 px-6 mt-8"
	>
		Todo
	</button>
</form>

<!--
- Cuando el usuario escribe en el input o limpia los filtros en SearchBar.svelte, se ejecuta dispatch("search", { filters }).
- La vista principal (employees.svelte) escucha el evento "search" y ejecuta handleSearch(event).
- handleSearch recibe los filtros y decide qué datos cargar con loadData().
-->
