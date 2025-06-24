import axios from "axios";
import { error } from "../stores/shared";

const apiClient = axios.create({
	baseURL: "http://localhost:3000/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

export default {
	// branch_store *
	countBranchStore: () => {
		return apiClient.get(`/branchStore/count`);
	},
	statusBranchStore: (status) => {
		return apiClient.get(`/branchStore/status?status=${status}`);
	},
	getAllBranchStore: async () => {
		try {
			const response = await apiClient.get(`/branchStore`);
			console.log(`API`, response);
			return response;
		} catch (error) {
			console.error("Error fetching branch store from api.js:", error);
			throw error;
		}
	},
	getByIdBranchStore: (id, options = {}) => {
		const { includeEmployees } = options;
		const queryString = includeEmployees
			? `?includeEmployees=${includeEmployees}`
			: "";
		return apiClient.get(`/branchStore/${id}${queryString}`);
	},
	createBranchStore: (data) => {
		return apiClient.post(`/branchStore`, data);
	},
	updateBranchStore: (id, data) => {
		return apiClient.put(`/branchStore/${id}`, data);
	},
	deactivateBranchStore: (id) => {
		return apiClient.put(`/branchStore/deactivate/${id}`);
	},
	activateBranchStore: (id) => {
		return apiClient.put(`/branchStore/activate/${id}`);
	},

	// employees *
	countEmployees: () => {
		return apiClient.get(`/employees/count`);
	},
	statusEmployees: (status) => {
		return apiClient.get(`/employees/status?status=${status}`);
	},
	//................................................
	getAllEmployees: async () => {
		try {
			const response = await apiClient.get(`/employees`);
			console.log(`API`, response);
			return response;
		} catch (error) {
			console.error("Error fetching employees from api.js:", error);
			throw error;
		}
	},
	//................................................
	getByIdEmployees: (id, options = {}) => {
		const { includeOrders } = options;
		const queryString = includeOrders
			? `?includeOrders=${includeOrders}`
			: "";
		return apiClient.get(`/employees/${id}${queryString}`);
	},
	createEmployees: (data) => {
		return apiClient.post(`/employees`, data);
	},
	updateEmployees: (id, data) => {
		return apiClient.put(`/employees/${id}`, data);
	},
	deactivateEmployees: (id) => {
		return apiClient.put(`/employees/deactivate/${id}`);
	},
	activateEmployees: (id) => {
		return apiClient.put(`/employees/activate/${id}`);
	},

	// supplier *
	countSupplier: () => {
		return apiClient.get(`/suppliers/count`);
	},
	statusSupplier: (status) => {
		return apiClient.get(`/suppliers/status?status=${status}`);
	},
	getAllSupplier: async (includeProducts = false) => {
		try {
			const response = await apiClient.get(
				`/suppliers${includeProducts ? "?includeProducts=true" : ""}`
			);
			console.log("API response with products?", response);
			return response;
		} catch (error) {
			console.error("Error fetching Suppliers from api.js:", error);
			throw error;
		}
	},

	getByIdSupplier: (id, options = {}) => {
		const { includeProducts } = options;
		const queryString = includeProducts
			? `?includeProducts=${includeProducts}`
			: "";
		return apiClient.get(`/suppliers/${id}${queryString}`);
	},
	createSupplier: (data) => {
		return apiClient.post(`/suppliers`, data);
	},
	updateSupplier: (id, data) => {
		return apiClient.put(`/suppliers/${id}`, data);
	},
	deactivateSupplier: (id) => {
		return apiClient.put(`/suppliers/deactivate/${id}`);
	},
	activateSupplier: (id) => {
		return apiClient.put(`/suppliers/activate/${id}`);
	},

	// categories
	countCategory: () => {
		return apiClient.get(`/category/count`);
	},
	statusCategory: (status) => {
		return apiClient.get(`/category/status?status=${status}`);
	},
	getAllCategory: async () => {
		try {
			const response = await apiClient.get(`/category`);
			console.log(`API`, response);
			return response;
		} catch (error) {
			console.error("Error fetching category from api.js:", error);
			throw error;
		}
	},
	getByIdCategory: (id, options = {}) => {
		const { includeProducts } = options;
		const queryString = includeProducts
			? `?includeProducts=${includeProducts}`
			: "";
		return apiClient.get(`/category/${id}${queryString}`);
	},
	createCategory: (data) => {
		return apiClient.post(`/category`, data);
	},
	updateCategory: (id, data) => {
		return apiClient.put(`/category/${id}`, data);
	},
	deactivateCategory: (id) => {
		return apiClient.put(`/category/deactivate/${id}`);
	},
	activateCategory: (id) => {
		return apiClient.put(`/category/activate/${id}`);
	},

	// products *
	countProducts: () => {
		return apiClient.get(`/products/count`); // ESTA FALLANDO
	},
	// statusProducts: async (status) => {
	// 	if (typeof status !== "boolean") {
	// 		throw new Error("Status must be a boolean API");
	// 	}

	// 	try {
	// 		const response = await apiClient.get("/products/status", {
	// 			status,
	// 		});
	// 		if (response.status !== 200) {
	// 			throw new Error(`API error: ${response.statusText}`);
	// 		}
	// 		return response.data;
	// 	} catch (error) {
	// 		console.error("API call failed:", error);
	// 		throw error;
	// 	}
	// },

	statusProducts: async (status) => {
		try {
			const response = await apiClient.get(
				`/products/status?status=${status}`
			);
			console.log(`API`, response);
			return response;
		} catch (error) {
			console.error("API call failed:", error);
			throw error;
		}
	},

	getAllProducts: async () => {
		try {
			const response = await apiClient.get(`/products`);
			console.log(`API`, response);
			return response;
		} catch (error) {
			console.error("Error fetching products from api.js:", error);
			throw error;
		}
	},
	getByNameProducts: (name) => {
		return apiClient.get(`/products/name/${name}`);
	},

	getByIdProducts: (id, options = {}) => {
		try {
			const { includeSupplier } = options;
			const queryString = includeSupplier
				? `?includeSupplier=${includeSupplier}`
				: "";
			return apiClient.get(`/products/${id}${queryString}`);
		} catch (error) {
			console.error("Error fetching products from api.js:", error);
			throw error;
		}
	},
	createProducts: (data) => {
		return apiClient.post(`/products`, data);
	},
	updateProducts: (id, data) => {
		return apiClient.put(`/products/${id}`, data);
	},
	deactivateProducts: (id) => {
		return apiClient.put(`/products/deactivate/${id}`);
	},
	activateProducts: (id) => {
		return apiClient.put(`/products/activate/${id}`);
	},

	// orders *
	countOrders: () => {
		return apiClient.get(`/orders/count`);
	},
	getAllOrders: async () => {
		try {
			const response = await apiClient.get(`/orders`);
			console.log(`API`, response);
			return response;
		} catch (error) {
			console.error("Error fetching orders from api.js:", error);
			throw error;
		}
	},
	getByIdOrders: (id) => {
		return apiClient.get(`/orders/${id}`);
	},
	getByDeliveryStatus: (filters) => {
		return apiClient.get(
			`/orders?delivery_status=${filters.delivery_status}`
		);
	},
	createOrders: (data) => {
		return apiClient.post(`/orders`, data);
	},
	updateOrders: (id, data) => {
		return apiClient.put(`/orders/${id}`, data);
	},

	// supplier_invoices
	countSupplierInvoices: () => {
		return apiClient.get(`/supplierInvoices/count`);
	},
	getAllSupplierInvoices: (payment_method = "", payment_status = "") => {
		const queryParams = [];
		if (payment_method)
			queryParams.push(`payment_method=${payment_method}`);
		if (payment_status)
			queryParams.push(`payment_status=${payment_status}`);
		// If the array has more than one element, join("&") automatically adds & between each element when joining them.
		const queryString = queryParams.length
			? `?${queryParams.join("&")}`
			: "";
		return apiClient.get(`/supplierInvoices${queryString}`);
	},
	getByIdSupplierInvoices: (id) => {
		return apiClient.get(`/supplierInvoices/${id}`);
	},
	createSupplierInvoices: (data) => {
		return apiClient.post(`/supplierInvoices`, data);
	},
	updateSupplierInvoices: (id, data) => {
		return apiClient.put(`/supplierInvoices/${id}`, data);
	},

	// invoice_content_supplier
	countInvoiceContentSupplier: () => {
		return apiClient.get(`/invoiceContentSupplier/count`);
	},
	getAllInvoiceContentSupplier: () => {
		return apiClient.get(`/invoiceContentSupplier`);
	},
	getByIdInvoiceContentSupplier: (id, options = {}) => {
		const { includeProducts } = options;
		const queryString = includeProducts
			? `?includeProducts=${includeProducts}`
			: "";
		return apiClient.get(`/invoiceContentSupplier/${id}${queryString}`);
	},
	createInvoiceContentSupplier: (data) => {
		return apiClient.post(`/invoiceContentSupplier`, data);
	},
	updateInvoiceContentSupplier: (id, data) => {
		return apiClient.put(`/invoiceContentSupplier/${id}`, data);
	},

	// customer *
	countCustomers: () => {
		return apiClient.get(`/customers/count`);
	},
	getAllCustomers: () => {
		return apiClient.get(`/customers`);
	},
	getByIdCustomers: (id, options = {}) => {
		const { includeInvoices } = options;
		const queryString = includeInvoices
			? `?includeInvoices=${includeInvoices}`
			: "";
		return apiClient.get(`/customers/${id}${queryString}`);
	},
	createCustomers: (data) => {
		return apiClient.post(`/customers`, data);
	},
	updateCustomers: (id, data) => {
		return apiClient.put(`/customers/${id}`, data);
	},

	// customer_invoice
	countCustomerInvoice: () => {
		return apiClient.get(`/customerInvoice/count`);
	},
	getAllCustomerInvoice: (payment_method = "", payment_status = "") => {
		const queryParams = [];
		if (payment_method)
			queryParams.push(`payment_method=${payment_method}`);
		if (payment_status)
			queryParams.push(`payment_status=${payment_status}`);
		// If the array has more than one element, join("&") automatically adds & between each element when joining them.
		const queryString = queryParams.length
			? `?${queryParams.join("&")}`
			: "";
		return apiClient.get(`/customerInvoice${queryString}`);
	},
	getByIdCustomerInvoice: (id) => {
		return apiClient.get(`/customerInvoice/${id}`);
	},
	createCustomerInvoice: (data) => {
		return apiClient.post(`/customerInvoice`, data);
	},
	updateCustomerInvoice: (id, data) => {
		return apiClient.put(`/customerInvoice/${id}`, data);
	},

	// invoice_content_customer
	countInvoiceContentCustomer: () => {
		return apiClient.get(`/invoiceContentCustomer/count`);
	},
	getAllInvoiceContentCustomer: () => {
		return apiClient.get(`/invoiceContentCustomer`);
	},
	getByIdInvoiceContentCustomer: (id, options = {}) => {
		const { includeProducts } = options;
		const queryString = includeProducts
			? `?includeProducts=${includeProducts}`
			: "";
		return apiClient.get(`/invoiceContentCustomer/${id}${queryString}`);
	},
	createInvoiceContentCustomer: (data) => {
		return apiClient.post(`/invoiceContentCustomer`, data);
	},
	updateInvoiceContentCustomer: (id, data) => {
		return apiClient.put(`/invoiceContentCustomer/${id}`, data);
	},

	// cart
	getAllCart: () => {
		return apiClient.get(`/cart`);
	},
	getByIdCart: (id, options = {}) => {
		const { includeCartItem } = options;
		const queryString = includeCartItem
			? `?includeCartItem=${includeCartItem}`
			: "";
		return apiClient.get(`/cart/${id}${queryString}`);
	},
	createCart: (data) => {
		return apiClient.post(`/cart`, data);
	},
	updateCart: (id, data) => {
		return apiClient.put(`/cart/${id}`, data);
	},
	deleteCart: (id, data) => {
		return apiClient.delete(`/cart/${id}`, data);
	},

	// cart item
	countOrders: () => {
		return apiClient.get(`/cartItem/count`);
	},
	getAllCartItem: () => {
		return apiClient.get(`/cartItem`);
	},
	getByIdCartItem: (id, options = {}) => {
		const { includeProducts } = options;
		const queryString = includeProducts
			? `?includeProducts=${includeProducts}`
			: "";
		return apiClient.get(`/cartItem/${id}${queryString}`);
	},
	createCartItem: (data) => {
		return apiClient.post(`/cartItem`, data);
	},
	updateCartItem: (id, data) => {
		return apiClient.put(`/cartItem/${id}`, data);
	},
	deleteCartItem: (id, data) => {
		return apiClient.delete(`/cartItem/${id}`, data);
	},

	// venta
	createSale: (data) => {
		return apiClient.post(`/sales`, data);
	},
};
