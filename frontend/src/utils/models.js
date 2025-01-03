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

// =========================================== ANTES ===============

// export async function loadBranchStores() {
// 	try {
// 		loading.set(true);
// 		const response = await api.getAllBranchStore();
// 		console.log("Data:", response);
// 		const sortedBranchStore = response.data.sort((a, b) => a.id - b.id);
// 		branch_store.set(sortedBranchStore);
// 	} catch (err) {
// 		error.set(err.message || "");
// 		console.error("Error en load branch store:", err);
// 	} finally {
// 		loading.set(false);
// 	}
// }
// //................................................
// export async function loadEmployees() {
// 	try {
// 		loading.set(true);
// 		const response = await api.getAllEmployees();
// 		console.log("Datos recibidos de la API:", response);
// 		// Ordenar empleados por ID en orden descendente
// 		const sortedEmployees = response.data.sort((a, b) => a.id - b.id);
// 		employees.set(sortedEmployees); // Asigna solo el array de empleados
// 	} catch (err) {
// 		error.set(err.message || "Error desconocido");
// 		console.error("Error en loadEmployees:", err);
// 	} finally {
// 		loading.set(false);
// 	}
// }

// //................................................
// export async function loadSupplier() {
// 	try {
// 		loading.set(true);
// 		const response = await api.getAllSupplier();
// 		console.log("Datos recibidos de la API:", response);
// 		const sortedSupplier = response.data.sort((a, b) => a.id - b.id);
// 		supplier.set(sortedSupplier);
// 	} catch (err) {
// 		error.set(err.message || "Error desconocido");
// 		console.error("Error en load suppliers:", err);
// 	} finally {
// 		loading.set(false);
// 	}
// }
// export async function loadCategory() {
// 	try {
// 		loading.set(true);
// 		const response = await api.getAllCategory();
// 		console.log("Datos recibidos de la API:", response);
// 		const sortedCategory = response.data.sort((a, b) => a.id - b.id);
// 		categories.set(sortedCategory);
// 	} catch (err) {
// 		error.set(err.message || "Error desconocido");
// 		console.error("Error en load category:", err);
// 	} finally {
// 		loading.set(false);
// 	}
// }
// // -------------------Products
// export async function loadProducts() {
// 	try {
// 		loading.set(true);
// 		const response = await api.getAllProducts();
// 		console.log("Datos recibidos de la API:", response);
// 		const sortedProducts = response.data.sort((a, b) => a.id - b.id);
// 		products.set(sortedProducts);
// 	} catch (err) {
// 		error.set(err.message || "Error desconocido");
// 		console.error("Error en loadProducts:", err);
// 	} finally {
// 		loading.set(false);
// 	}
// }

// export async function loadProductsById(id) {
// 	try {
// 		loading.set(true);
// 		// Asegurarse de que el ID no esté vacío
// 		if (!id) {
// 			products.set([]);
// 			return;
// 		}
// 		const response = await api.getByIdProducts(id);
// 		// Actualizar el estado solo con el producto encontrado
// 		products.set([response.data]);
// 	} catch (err) {
// 		error.set(err.message || "Unknown error");
// 		console.log("error in products");
// 		products.set([]);
// 	} finally {
// 		loading.set(false);
// 	}
// }

// export async function loadOrders() {
// 	try {
// 		loading.set(true);
// 		const response = await api.getAllOrders();
// 		console.log("Datos recibidos de la API:", response);
// 		const sortedOrders = response.data.sort((a, b) => a.id - b.id);
// 		orders.set(sortedOrders); // Asigna solo el array de empleados
// 	} catch (err) {
// 		error.set(err.message || "Error desconocido");
// 		console.error("Error en load orders:", err);
// 	} finally {
// 		loading.set(false);
// 	}
// }
// export async function loadCustomers() {
// 	try {
// 		loading.set(true);
// 		const response = await api.getAllCustomers();
// 		console.log("Datos recibidos de la API:", response);
// 		const sortedCustomer = response.data.sort((a, b) => a.id - b.id);
// 		customer.set(sortedCustomer);
// 	} catch (err) {
// 		error.set(err.message || "Error desconocido");
// 		console.error("Error load customers:", err);
// 	} finally {
// 		loading.set(false);
// 	}
// }
