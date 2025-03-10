import { relations } from "drizzle-orm/relations";
import { workspace, files, folders, usersInAuth, users, customers, products, prices, subscriptions } from "./schema";

export const filesRelations = relations(files, ({one}) => ({
	workspace: one(workspace, {
		fields: [files.workspaceId],
		references: [workspace.id]
	}),
	folder: one(folders, {
		fields: [files.folderId],
		references: [folders.id]
	}),
}));

export const workspaceRelations = relations(workspace, ({many}) => ({
	files: many(files),
	folders: many(folders),
}));

export const foldersRelations = relations(folders, ({one, many}) => ({
	files: many(files),
	workspace: one(workspace, {
		fields: [folders.workspaceId],
		references: [workspace.id]
	}),
}));

export const usersRelations = relations(users, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [users.id],
		references: [usersInAuth.id]
	}),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	users: many(users),
	customers: many(customers),
	subscriptions: many(subscriptions),
}));

export const customersRelations = relations(customers, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [customers.id],
		references: [usersInAuth.id]
	}),
}));

export const pricesRelations = relations(prices, ({one, many}) => ({
	product: one(products, {
		fields: [prices.productId],
		references: [products.id]
	}),
	subscriptions: many(subscriptions),
}));

export const productsRelations = relations(products, ({many}) => ({
	prices: many(prices),
}));

export const subscriptionsRelations = relations(subscriptions, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [subscriptions.userId],
		references: [usersInAuth.id]
	}),
	price: one(prices, {
		fields: [subscriptions.priceId],
		references: [prices.id]
	}),
}));