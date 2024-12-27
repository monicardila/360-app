import { writable } from "svelte/store";
import api from "../utils/api.js";

// Global states
export const branch_store = writable([]);
export const employees = writable([]);
export const supplier = writable([]);
export const categories = writable([]);
export const products = writable([]);
export const orders = writable([]);
export const supplier_invoices = writable([]);
export const invoice_content_supplier = writable([]);
export const customer = writable([]);
export const customer_invoice = writable([]);
export const invoice_content_customer = writable([]);

export const loading = writable(false); // A store that indicates whether an operation is in progress
export const error = writable(null);

// Data loading functions

export async function loadBranchStores() {
	try {
		loading.set(true);
		const response = await api.getAllBranchStore();
		console.log("Datos recibidos de la API:", response);
		const sortedBranchStore = response.data.sort((a, b) => a.id - b.id);
		branch_store.set(sortedBranchStore);
	} catch (err) {
		error.set(err.message || "Error desconocido");
		console.error("Error en load branch store:", err);
	} finally {
		loading.set(false);
	}
}
//................................................
export async function loadEmployees() {
	try {
		loading.set(true);
		const response = await api.getAllEmployees();
		console.log("Datos recibidos de la API:", response);
		// Ordenar empleados por ID en orden descendente
		const sortedEmployees = response.data.sort((a, b) => a.id - b.id);
		employees.set(sortedEmployees); // Asigna solo el array de empleados
	} catch (err) {
		error.set(err.message || "Error desconocido");
		console.error("Error en loadEmployees:", err);
	} finally {
		loading.set(false);
	}
}

//................................................
export async function loadSupplier() {
	try {
		loading.set(true);
		const response = await api.getAllSupplier();
		console.log("Datos recibidos de la API:", response);
		const sortedSupplier = response.data.sort((a, b) => a.id - b.id);
		supplier.set(sortedSupplier);
	} catch (err) {
		error.set(err.message || "Error desconocido");
		console.error("Error en load suppliers:", err);
	} finally {
		loading.set(false);
	}
}
export async function loadCategory() {
	try {
		loading.set(true);
		const response = await api.getAllCategory();
		console.log("Datos recibidos de la API:", response);
		const sortedCategory = response.data.sort((a, b) => a.id - b.id);
		categories.set(sortedCategory);
	} catch (err) {
		error.set(err.message || "Error desconocido");
		console.error("Error en load category:", err);
	} finally {
		loading.set(false);
	}
}
export async function loadProducts() {
	try {
		loading.set(true);
		const response = await api.getAllProducts();
		console.log("Datos recibidos de la API:", response);
		const sortedProducts = response.data.sort((a, b) => a.id - b.id);
		products.set(sortedProducts);
	} catch (err) {
		error.set(err.message || "Error desconocido");
		console.error("Error en loadProducts:", err);
	} finally {
		loading.set(false);
	}
}
export async function loadOrders() {
	try {
		loading.set(true);
		const response = await api.getAllOrders();
		console.log("Datos recibidos de la API:", response);
		const sortedOrders = response.data.sort((a, b) => a.id - b.id);
		orders.set(sortedOrders); // Asigna solo el array de empleados
	} catch (err) {
		error.set(err.message || "Error desconocido");
		console.error("Error en load orders:", err);
	} finally {
		loading.set(false);
	}
}
export async function loadCustomers() {
	try {
		loading.set(true);
		const response = await api.getAllCustomers();
		console.log("Datos recibidos de la API:", response);
		const sortedCustomer = response.data.sort((a, b) => a.id - b.id);
		customer.set(sortedCustomer);
	} catch (err) {
		error.set(err.message || "Error desconocido");
		console.error("Error load customers:", err);
	} finally {
		loading.set(false);
	}
}

// branch_store *
// employees *
// supplier *
// categories
// products *
// orders *
// supplier_invoices
// invoice_content_supplier
// customer *
// customer_invoice
// invoice_content_customer
