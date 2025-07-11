<script>
	import { createEventDispatcher, onMount } from "svelte";

	export let fields = [];
	export let model = {};
	export let submitLabel = "Guardar";

	const dispatch = createEventDispatcher();
	let formData = {};

	// Si cambia el modelo externamente, solo entonces reinicializa
	let initialized = false;

	function initializeFormData() {
		console.log("valores formulario: ---------------");

		const temp = {};
		for (const field of fields) {
			//if (field.name === "id") continue;
			temp[field.name] =
				model?.[field.name] ?? (field.type === "checkbox" ? false : "");
		}
		formData = structuredClone(temp);
	}

	$: if (!initialized && model && Object.keys(model).length > 0) {
		initializeFormData();
		initialized = true;
	}

	// Inicializa formData al montar (solo una vez)
	onMount(() => {
		if (Object.keys(formData).length === 0) {
			initializeFormData();
		}
	});

	function handleSubmit(e) {
		if (formData.order_date) {
			formData.order_date = new Date(formData.order_date).toISOString();
		}
		console.log("formData al enviar:", formData);

		e.preventDefault();
		dispatch("submit", formData);
	}

	function closeModal() {
		dispatch("close");
	}
</script>

<div
	class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
	<form
		on:submit={handleSubmit}
		class="space-y-4 p-10 bg-white rounded shadow-md relative w-[500px] max-h-[90vh] overflow-y-auto pt-16 bo"
	>
		<h4 class=" justify-center flex mb-8">
			_________ {submitLabel} _________
		</h4>
		<button
			class="absolute right-8 top-8 px-1 border border-gray-400 hover:text-red-600 pointer-events-auto"
			on:click={closeModal}
			type="button"
		>
			x
		</button>
		{#each fields as field}
			{#if field.name === "id"}
				<!-- Campo oculto solo para enviar el ID en formData -->
				<input type="hidden" id="id" bind:value={formData.id} />
			{:else}
				<!-- Renderiza los campos visibles como ya lo haces -->
				<div>
					<label
						for={field.name}
						class="block mb-1 text-sm font-medium text-gray-700"
					>
						{field.label}
					</label>

					{#if field.type === "select"}
						<select
							id={field.name}
							bind:value={formData[field.name]}
							class="w-full border border-gray-300 p-2 rounded"
							required={field.required}
							disabled={!field.editable}
						>
							<option value="">Seleccione una opción</option>
							{#each field.options as opt}
								<option value={opt.id}>{opt.name}</option>
							{/each}
						</select>
					{:else if field.type === "checkbox"}
						<div class="flex items-center">
							<input
								id={field.name}
								type="checkbox"
								bind:checked={formData[field.name]}
								class="mr-2"
								disabled={!field.editable}
							/>
							<span class="text-sm text-gray-600">Activado</span>
						</div>
					{:else if field.type === "textarea"}
						<textarea
							id={field.name}
							bind:value={formData[field.name]}
							class="w-full border border-gray-300 p-2 rounded"
							required={field.required}
							disabled={!field.editable}
						></textarea>
					{:else if field.type === "number"}
						<input
							id={field.name}
							type="number"
							bind:value={formData[field.name]}
							class="w-full border border-gray-300 p-2 rounded"
							required={field.required}
							disabled={!field.editable}
						/>
					{:else if field.type === "email"}
						<input
							id={field.name}
							type="email"
							bind:value={formData[field.name]}
							class="w-full border border-gray-300 p-2 rounded"
							required={field.required}
							disabled={!field.editable}
						/>
					{:else if field.type === "date"}
						<input
							id={field.name}
							type="date"
							bind:value={formData[field.name]}
							class="w-full border border-gray-300 p-2 rounded"
							required={field.required}
							disabled={!field.editable}
						/>
					{:else}
						<!-- Campo tipo texto por defecto -->
						<input
							id={field.name}
							type="text"
							bind:value={formData[field.name]}
							class="w-full border border-gray-300 p-2 rounded"
							required={field.required}
							disabled={!field.editable}
						/>
					{/if}
				</div>
			{/if}
		{/each}

		<div class="flex justify-end mt-6">
			<button
				type="submit"
				class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
			>
				{submitLabel}
			</button>
		</div>
	</form>
</div>
