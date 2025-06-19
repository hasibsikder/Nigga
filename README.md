# Hasib's Shop - E-commerce Website

A professional e-commerce website with glassmorphism design effects and cash payment system.

## Features

- ✨ Modern glassmorphism UI with blur effects
- 🛍️ Product showcase with search and filtering
- 🛒 Shopping cart with real-time updates
- 💵 Cash-on-delivery payment system
- 📞 Contact forms and newsletter signup
- 🗄️ PostgreSQL database for persistent storage

## Local Development Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=development
   ```

3. **Set up the database:**
   ```bash
   npm run db:push
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5000`

## Project Structure

```
├── client/          # React frontend with glassmorphism design
├── server/          # Express.js backend API
├── shared/          # Database schema and shared types
├── package.json     # Dependencies and scripts
└── vite.config.ts   # Build configuration
```

## Database Setup

The app uses PostgreSQL with Drizzle ORM. Tables include:
- `products` - Product catalog
- `orders` - Customer orders
- `contacts` - Contact form submissions
- `newsletters` - Newsletter subscriptions

## Deployment

For production deployment:
1. Set `NODE_ENV=production`
2. Configure your PostgreSQL database
3. Run `npm run build` to build the frontend
4. Start with `npm start`

## Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL, Drizzle ORM
- **UI Components:** Shadcn/ui with glassmorphism effects
- **Payment:** Cash on Delivery system

## Support

For questions about setup or customization, refer to the documentation or contact support.