import { writable } from "svelte/store";

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
export const cart = writable([]);
export const cartItem = writable([]);

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
// cart
// cartItem
