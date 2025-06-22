// Centralizar la lógica de carga de datos, desde el backend hacia el frontend, y los almacena automáticamente en el store correspondiente de Svelte.

import api from "./api";
import { loading, error } from "../stores/shared";
import {
	products,
	employees,
	supplier,
	orders,
	customer,
	branch_store,
	categories,
	cart,
	cartItem,
} from "../stores/models";

const modelConfig = {
	products: {
		store: products,
		fetchers: {
			all: api.getAllProducts,
			byId: api.getByIdProducts,
			byStatus: api.statusProducts,
			byName: api.getByNameProducts,
		},
		actions: {
			update: api.updateProducts, // <-- aquí agregas esto
		},
	},
	employees: {
		store: employees,
		fetchers: {
			all: api.getAllEmployees,
			byId: api.getByIdEmployees,
			byStatus: api.statusEmployees,
		},
	},
	supplier: {
		store: supplier,
		fetchers: {
			all: api.getAllSupplier,
			byId: api.getByIdSupplier,
			byStatus: api.statusSupplier,
			// filter by nit
		},
	},
	orders: {
		store: orders,
		fetchers: {
			all: api.getAllOrders,
			byId: api.getByIdOrders,
			// filter by status
		},
	},
	customer: {
		store: customer,
		fetchers: {
			all: api.getAllCustomers,
			byId: api.getByIdCustomers,
		},
	},
	branch_store: {
		store: branch_store,
		fetchers: {
			all: api.getAllBranchStore,
			byId: api.getByIdBranchStore,
			byStatus: api.statusBranchStore,
		},
	},
	categories: {
		store: categories,
		fetchers: {
			all: api.getAllCategory,
			byId: api.getByIdCategory,
			byStatus: api.statusCategory,
		},
	},
	cart: {
		store: cart,
		fetchers: {
			all: api.getAllCart,
			byId: api.getByIdCart,
		},
	},
	cartItem: {
		store: cartItem,
		fetchers: {
			all: api.getAllCartItem,
			byId: api.getByIdCartItem,
		},
	},
};

export async function loadData(type, operation, filters = {}) {
	try {
		loading.set(true);
		error.set(null);

		const config = modelConfig[type];

		if (!config) {
			throw new Error(`Unrecognized model type: ${type}`);
		}

		const { store, fetchers } = config;
		const fetcher = fetchers[operation];

		if (!fetcher) {
			throw new Error(`Operation not supported ${operation}`);
		}

		let response;

		if (operation === "all") {
			response = await fetcher();
		} else if (operation === "byName" && filters.name) {
			response = await fetcher(filters.name);
		} else if (operation === "byStatus" && filters.status !== undefined) {
			response = await fetcher(filters.status);
		} else if (operation === "byId" && filters.id) {
			response = await fetcher(filters.id);
		} else {
			throw new Error(
				`Unsupported operation or missing filters: ${operation}`
			);
		}

		store.set(
			Array.isArray(response.data) ? response.data : [response.data]
		);
	} catch (err) {
		error.set(err.message || "Unknown error");
		if (modelConfig[type]) {
			modelConfig[type].store.set([]); // Limpia la tienda en caso de error
		}
	} finally {
		loading.set(false);
	}
}

export async function updateModel(type, id, data) {
	try {
		const config = modelConfig[type];
		if (!config || !config.actions || !config.actions.update) {
			throw new Error(`Update not supported for model: ${type}`);
		}

		const response = await config.actions.update(id, data);
		return response;
	} catch (err) {
		console.error(`Error updating ${type}:`, err);
		throw err;
	}
}
