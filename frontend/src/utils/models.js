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
			update: api.updateProducts,
			create: api.createProducts,
		},
	},
	employees: {
		store: employees,
		fetchers: {
			all: api.getAllEmployees,
			byId: api.getByIdEmployees,
			byStatus: api.statusEmployees,
		},
		actions: {
			update: api.updateEmployees,
			create: api.createEmployees,
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
		actions: {
			update: api.updateSupplier,
			create: api.createSupplier,
		},
	},
	orders: {
		store: orders,
		fetchers: {
			all: api.getAllOrders,
			byId: api.getByIdOrders,
			byStatus: api.getByDeliveryStatus,
			// filter by status
		},
		actions: {
			update: api.updateOrders,
			create: api.createOrders,
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
		actions: {
			update: api.updateBranchStore,
			create: api.createBranchStore,
		},
	},
	categories: {
		store: categories,
		fetchers: {
			all: (filters) => api.getAllCategory(filters.includeProducts),
			byId: api.getByIdCategory,
			byStatus: api.statusCategory,
		},
		actions: {
			update: api.updateCategory,
			create: api.createCategory,
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
		const fetcher = fetchers[operation]; // => fetchers["status"] => api.getByDeliveryStatus <- ejemplo

		if (!fetcher) {
			throw new Error(`Operation not supported ${operation}`);
		}

		let response;

		if (operation === "all") {
			response = await fetcher(filters);
		} else if (operation === "byName" && filters.name) {
			response = await fetcher(filters.name);
		} else if (operation === "byStatus" && filters.status !== undefined) {
			response = await fetcher(filters.status);
		} else if (operation === "byId" && filters.id) {
			const extraParams = {};

			if (filters.includeProducts) {
				extraParams.includeProducts = true;
			}
			if (filters.includeInvoices) {
				extraParams.includeInvoices = true;
			}

			response = await fetcher(filters.id, extraParams);
		} else if (operation === "byStatus" && filters.delivery_status) {
			response = await fetcher(filters);
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

export async function createModel(type, data) {
	try {
		if ("id" in data) {
			delete data.id;
		}
		const config = modelConfig[type];
		if (!config || !config.actions || !config.actions.create) {
			throw new Error(`Create not supported for model: ${type}`);
		}

		const response = await config.actions.create(data);
		return response;
	} catch (err) {
		console.error(`Error creating ${type}:`, err);
		throw err;
	}
}
