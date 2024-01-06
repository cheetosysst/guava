import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("users", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	username: text("username").notNull(),
	passwordHash: text("passsword_hash").notNull(),
	role: text("role", { enum: ["normal", "admin"] })
		.notNull()
		.default("normal"),
});

export const userProfile = sqliteTable("user_profile", {
	id: integer("id", { mode: "number" })
		.primaryKey()
		.references(() => user.id, {
			onDelete: "cascade",
		}),
	email: text("email", { mode: "text" }).notNull(),
	createDate: text("create_date").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const business = sqliteTable("business", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
});

export const businessAccount = sqliteTable("business_account", {
	id: integer("id", { mode: "number" })
		.primaryKey()
		.references(() => user.id, { onDelete: "cascade" }),
	business: integer("business").references(() => business.id, {
		onDelete: "cascade",
	}),
});

export const product = sqliteTable("product", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	business: integer("business", { mode: "number" }).references(
		() => business.id,
		{ onDelete: "cascade" },
	),
	name: text("name", { mode: "text" }).notNull(),
	description: text("description", { mode: "text" }),
	price: integer("price").notNull().default(Number.MAX_VALUE),
	amount: integer("amount").notNull().default(0),
});

export const productImage = sqliteTable("product_image", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	product: integer("product").references(() => product.id, {
		onDelete: "cascade",
	}),
	url: text("url", { mode: "text" }).notNull(),
});

export const cartItem = sqliteTable("cart_item", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }), // realistically this might not end well but good enough ig. UUID would be a better option for this usecase
	user: integer("user", { mode: "number" }).references(() => user.id, {
		onDelete: "cascade",
	}),
	product: integer("product", { mode: "number" }).references(
		() => product.id,
		{ onDelete: "cascade" },
	),
	amount: integer("amount"),
});

export const relationCartItem = relations(cartItem, ({ one }) => ({
	user: one(user, {
		fields: [cartItem.user],
		references: [user.id],
	}),
	product: one(product, {
		fields: [cartItem.product],
		references: [product.id],
	}),
}));

export const relationUser = relations(user, ({ one, many }) => ({
	profile: one(userProfile, {
		fields: [user.id],
		references: [userProfile.id],
	}),
	businessAccount: one(businessAccount, {
		fields: [user.id],
		references: [businessAccount.id],
	}),
	cartItem: many(cartItem),
}));

export const relationUserProfile = relations(userProfile, ({ one }) => ({
	user: one(user, {
		fields: [userProfile.id],
		references: [user.id],
	}),
}));

export const relationBusiness = relations(business, ({ one, many }) => ({
	businessAccount: many(businessAccount),
	product: many(product),
}));

export const relationBusinessAccount = relations(
	businessAccount,
	({ one }) => ({
		business: one(business, {
			fields: [businessAccount.business],
			references: [business.id],
		}),
		user: one(user, {
			fields: [businessAccount.id],
			references: [user.id],
		}),
	}),
);

export const relationProduct = relations(product, ({ one, many }) => ({
	productImage: many(productImage),
	business: one(business, {
		fields: [product.id],
		references: [business.id],
	}),
}));

export const relationProductImage = relations(productImage, ({ one }) => ({
	product: one(product, {
		fields: [productImage.id],
		references: [product.id],
	}),
}));
