import { 
  pgTable, text, serial, integer, decimal, boolean, timestamp, 
  json, pgEnum, primaryKey, index 
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Enums for consistent values
export const productStatusEnum = pgEnum("product_status", [
  "active", 
  "draft", 
  "archived"
]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled"
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "credit_card",
  "paypal",
  "bank_transfer",
  "cash_on_delivery"
]);

// Products table with enhanced fields
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  cost: decimal("cost", { precision: 10, scale: 2 }),
  sku: text("sku").unique(),
  barcode: text("barcode"),
  imageUrl: text("image_url").notNull(),
  gallery: text("gallery").array(), // Array of image URLs
  category: text("category").notNull(),
  tags: text("tags").array(),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
  reviewCount: integer("review_count").default(0),
  stock: integer("stock").default(0),
  weight: decimal("weight", { precision: 6, scale: 2 }),
  dimensions: text("dimensions"),
  status: productStatusEnum("status").default("active"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  nameIdx: index("product_name_idx").on(table.name),
  categoryIdx: index("product_category_idx").on(table.category),
  priceIdx: index("product_price_idx").on(table.price),
}));

// Product variants
export const productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  name: text("name").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }),
  sku: text("sku"),
  stock: integer("stock").default(0),
});

// Orders table with enhanced fields
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: text("user_id"), // Reference to auth.users if using auth
  orderNumber: text("order_number").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  address2: text("address_2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  country: text("country").notNull(),
  paymentMethod: paymentMethodEnum("payment_method").notNull(),
  paymentStatus: text("payment_status").default("pending"),
  transactionId: text("transaction_id"),
  notes: text("notes"),
  items: json("items").notNull(), // JSON array of cart items
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 10, scale: 2 }).default("0"),
  tax: decimal("tax", { precision: 10, scale: 2 }).notNull(),
  shipping: decimal("shipping", { precision: 10, scale: 2 }).default("0"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum("status").notNull().default("pending"),
  trackingNumber: text("tracking_number"),
  trackingCompany: text("tracking_company"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  emailIdx: index("order_email_idx").on(table.email),
  statusIdx: index("order_status_idx").on(table.status),
  dateIdx: index("order_date_idx").on(table.createdAt),
}));

// Customers table (if you need to track customers separately)
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  userId: text("user_id").unique(), // Reference to auth.users if using auth
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  country: text("country"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contacts table
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").default("unread"), // unread, read, replied
  createdAt: timestamp("created_at").defaultNow(),
});

// Newsletters table
export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  subscribed: boolean("subscribed").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ========== SCHEMAS ==========
// Product schemas
export const insertProductSchema = createInsertSchema(products, {
  name: z.string().min(3).max(100),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10).max(2000),
  price: z.string().regex(/^\d+\.\d{2}$/),
  imageUrl: z.string().url(),
  category: z.string().min(2).max(50),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProductSchema = insertProductSchema.partial();

// Order schemas
export const insertOrderSchema = createInsertSchema(orders, {
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  items: z.record(z.any()).array(), // More specific validation possible
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Contact schemas
export const insertContactSchema = createInsertSchema(contacts, {
  email: z.string().email(),
  message: z.string().min(10).max(2000),
}).omit({
  id: true,
  createdAt: true,
});

// Newsletter schemas
export const insertNewsletterSchema = createInsertSchema(newsletters, {
  email: z.string().email(),
}).omit({
  id: true,
  createdAt: true,
});

// ========== TYPES ==========
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;

export type CartItem = {
  productId: number;
  variantId?: number;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
  maxQuantity?: number;
};
