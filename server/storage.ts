import { 
  products, 
  orders, 
  contacts, 
  newsletters,
  type Product, 
  type InsertProduct,
  type Order, 
  type InsertOrder,
  type Contact, 
  type InsertContact,
  type Newsletter, 
  type InsertNewsletter 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Orders
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Newsletter
  getNewsletterSubscribers(): Promise<Newsletter[]>;
  createNewsletterSubscriber(newsletter: InsertNewsletter): Promise<Newsletter>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize with sample products if needed
    this.initializeProducts().catch(console.error);
  }

  private async initializeProducts() {
    // Check if products already exist
    const existingProducts = await this.getProducts();
    if (existingProducts.length > 0) {
      return; // Products already initialized
    }

    const sampleProducts: InsertProduct[] = [
      {
        name: "Wireless Headphones",
        description: "Premium audio experience with noise cancellation",
        price: "199.99",
        originalPrice: "249.99",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "electronics",
        rating: "4.9",
        inStock: true,
      },
      {
        name: "Smart Watch Pro",
        description: "Advanced fitness tracking with premium design",
        price: "349.99",
        originalPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "electronics",
        rating: "4.7",
        inStock: true,
      },
      {
        name: "Leather Handbag",
        description: "Handcrafted genuine leather with premium finish",
        price: "159.99",
        originalPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "fashion",
        rating: "5.0",
        inStock: true,
      },
      {
        name: "Modern Desk Lamp",
        description: "Adjustable LED lighting for perfect workspace illumination",
        price: "89.99",
        originalPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "home",
        rating: "4.6",
        inStock: true,
      },
      {
        name: "Camera Lens 50mm",
        description: "Professional grade lens for stunning photography",
        price: "599.99",
        originalPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "electronics",
        rating: "4.8",
        inStock: true,
      },
      {
        name: "Ceramic Vase",
        description: "Handcrafted ceramic with modern minimalist design",
        price: "39.99",
        originalPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "home",
        rating: "4.5",
        inStock: true,
      },
      {
        name: "Coffee Maker Pro",
        description: "Professional brewing system for perfect coffee every time",
        price: "279.99",
        originalPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "home",
        rating: "4.9",
        inStock: true,
      },
      {
        name: "Wireless Charger",
        description: "Fast wireless charging with sleek design",
        price: "49.99",
        originalPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "electronics",
        rating: "4.4",
        inStock: true,
      },
    ];

    for (const product of sampleProducts) {
      await this.createProduct(product);
    }
  }

  // Products
  async getProducts(): Promise<Product[]> {
    const result = await db.select().from(products);
    return result;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    const result = await db.select().from(orders);
    return result;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values(insertOrder)
      .returning();
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [order] = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    return order || undefined;
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    const result = await db.select().from(contacts);
    return result;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  // Newsletter
  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    const result = await db.select().from(newsletters);
    return result;
  }

  async createNewsletterSubscriber(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const [existing] = await db
      .select()
      .from(newsletters)
      .where(eq(newsletters.email, insertNewsletter.email));
    
    if (existing) {
      throw new Error("Email already subscribed");
    }

    const [newsletter] = await db
      .insert(newsletters)
      .values(insertNewsletter)
      .returning();
    return newsletter;
  }
}

// Use MemStorage as fallback if database connection fails
let storage: IStorage;

// Fallback MemStorage class for local development
class MemStorage implements IStorage {
    private products: Map<number, Product> = new Map();
    private orders: Map<number, Order> = new Map();
    private contacts: Map<number, Contact> = new Map();
    private newsletters: Map<number, Newsletter> = new Map();
    private currentProductId = 1;
    private currentOrderId = 1;
    private currentContactId = 1;
    private currentNewsletterId = 1;

    constructor() {
      this.initializeProducts();
    }

    private initializeProducts() {
      const sampleProducts: InsertProduct[] = [
        {
          name: "Wireless Headphones",
          description: "Premium audio experience with noise cancellation",
          price: "199.99",
          originalPrice: "249.99",
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          category: "electronics",
          rating: "4.9",
          inStock: true,
        },
        {
          name: "Smart Watch Pro",
          description: "Advanced fitness tracking with premium design",
          price: "349.99",
          originalPrice: null,
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          category: "electronics",
          rating: "4.7",
          inStock: true,
        },
        {
          name: "Leather Handbag",
          description: "Handcrafted genuine leather with premium finish",
          price: "159.99",
          originalPrice: null,
          imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          category: "fashion",
          rating: "5.0",
          inStock: true,
        },
        {
          name: "Modern Desk Lamp",
          description: "Adjustable LED lighting for perfect workspace illumination",
          price: "89.99",
          originalPrice: null,
          imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          category: "home",
          rating: "4.6",
          inStock: true,
        }
      ];

      sampleProducts.forEach(product => {
        this.createProduct(product);
      });
    }

    async getProducts(): Promise<Product[]> {
      return Array.from(this.products.values());
    }

    async getProduct(id: number): Promise<Product | undefined> {
      return this.products.get(id);
    }

    async createProduct(insertProduct: InsertProduct): Promise<Product> {
      const id = this.currentProductId++;
      const product: Product = { 
        ...insertProduct, 
        id,
        originalPrice: insertProduct.originalPrice || null,
        rating: insertProduct.rating || null,
        inStock: insertProduct.inStock ?? true
      };
      this.products.set(id, product);
      return product;
    }

    async getOrders(): Promise<Order[]> {
      return Array.from(this.orders.values());
    }

    async getOrder(id: number): Promise<Order | undefined> {
      return this.orders.get(id);
    }

    async createOrder(insertOrder: InsertOrder): Promise<Order> {
      const id = this.currentOrderId++;
      const order: Order = { 
        ...insertOrder, 
        id,
        status: "pending",
        paymentMethod: insertOrder.paymentMethod || "cash",
        notes: insertOrder.notes || null,
        createdAt: new Date()
      };
      this.orders.set(id, order);
      return order;
    }

    async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
      const order = this.orders.get(id);
      if (order) {
        order.status = status;
        this.orders.set(id, order);
        return order;
      }
      return undefined;
    }

    async getContacts(): Promise<Contact[]> {
      return Array.from(this.contacts.values());
    }

    async createContact(insertContact: InsertContact): Promise<Contact> {
      const id = this.currentContactId++;
      const contact: Contact = { 
        ...insertContact, 
        id,
        phone: insertContact.phone || null,
        createdAt: new Date()
      };
      this.contacts.set(id, contact);
      return contact;
    }

    async getNewsletterSubscribers(): Promise<Newsletter[]> {
      return Array.from(this.newsletters.values());
    }

    async createNewsletterSubscriber(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
      const existing = Array.from(this.newsletters.values()).find(
        subscriber => subscriber.email === insertNewsletter.email
      );
      
      if (existing) {
        throw new Error("Email already subscribed");
      }

      const id = this.currentNewsletterId++;
      const newsletter: Newsletter = { 
        ...insertNewsletter, 
        id,
        createdAt: new Date()
      };
      this.newsletters.set(id, newsletter);
      return newsletter;
    }
}

// Initialize storage with proper error handling
if (db) {
  try {
    storage = new DatabaseStorage();
    console.log('Using database storage');
  } catch (error) {
    console.warn('Database storage failed, using in-memory storage');
    storage = new MemStorage();
  }
} else {
  console.log('Using in-memory storage');
  storage = new MemStorage();
}

export { storage };
