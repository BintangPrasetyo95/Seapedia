# SEAPEDIA

SEAPEDIA is an end-to-end e-commerce platform specializing in maritime and seafood products. It implements a unique multi-role authentication system where a single user account can act as a Buyer, Seller, Driver, or Admin without needing separate credentials.

## Features

- **Multi-Role Authentication**: Seamlessly switch between Buyer, Seller, Driver, and Admin roles using a central Role Selection interface.
- **Role-Based Access Control (RBAC)**: Strict middleware enforcement ensures isolated experiences for each role.
- **Buyer Ecosystem**: A dedicated shopping interface, cart management, checkout with shipping calculations, discount code application, and wallet-based transactions.
- **Seller Ecosystem**: Comprehensive dashboard, store management, product inventory CRUD, and order fulfillment status updates.
- **Driver Ecosystem**: Real-time job board to pick up pending deliveries and a dashboard to track earnings based on calculated delivery fees.
- **Admin Supervision**: Platform-wide metrics dashboard, voucher/promo generation, and automated business rules to enforce delivery SLAs (Service Level Agreements) and process overdue order refunds.

## Tech Stack

- **Backend**: Laravel 11.x
- **Frontend**: React (with Inertia.js)
- **Styling**: Tailwind CSS (Apple-inspired design system tokens defined in `DESIGN.md`)
- **Database**: MySQL

## Setup Instructions

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js & npm
- MySQL

### Installation

1. **Clone the repository** (if applicable) and navigate to the project directory:
   ```bash
   cd Seapedia
   ```

2. **Install PHP dependencies**:
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

4. **Environment Configuration**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update your `.env` file with your local database credentials (e.g., `DB_DATABASE=seapedia`).

5. **Generate Application Key**:
   ```bash
   php artisan key:generate
   ```

6. **Run Migrations and Seeders**:
   This step is crucial. The seeder generates the default roles, a sample store, sample products, and test accounts for every role.
   ```bash
   php artisan migrate:fresh --seed
   ```

7. **Compile Frontend Assets**:
   ```bash
   npm run dev
   ```

8. **Serve the Application**:
   In a new terminal tab, start the local development server:
   ```bash
   php artisan serve
   ```

## Default Test Accounts

After running the database seeders, you can use the following default test accounts to explore the different roles.

**Password for all accounts:** `password`

| Role   | Email                  | Description                                                                 |
|--------|------------------------|-----------------------------------------------------------------------------|
| Admin  | `admin@seapedia.com`   | Access to the Admin dashboard and Voucher generation tools.                 |
| Seller | `seller@seapedia.com`  | Has a pre-configured store ("Bintang Premium Seafood") and products.        |
| Buyer  | `buyer@seapedia.com`   | Comes with a pre-seeded wallet balance (Rp 5,000) and a default address.    |
| Driver | `driver@seapedia.com`  | Can access the Job Board to take available deliveries and view earnings.    |
| Multi  | `multi@seapedia.com`   | Account with both Seller and Buyer roles to test the Role Selection screen. |

## Business Rules & Implementation Notes

### Single-Store Checkout Behavior
SEAPEDIA enforces a **Single-Store Checkout** rule. A buyer's cart may only contain products from a single store at a time. If a buyer attempts to add a product from a different store to an already populated cart, the system will prompt them to clear the cart or checkout the existing items first. This ensures clean order routing and prevents complex multi-store shipping fee calculations.

### Discount Combination and PPN 12% Rule
- **Discount Types:** The system supports Vouchers (limited usage) and Promos (unlimited usage, expiring). 
- **Combination Rule:** Currently, only one discount code can be applied per checkout.
- **PPN 12% Calculation:** PPN 12% is applied to the **subtotal AFTER the discount has been deducted**. It is not applied to the delivery fee. `Grand Total = (Subtotal - Discount) + (Subtotal - Discount) * 0.12 + Delivery Fee`.

### Driver Earning Rule
Drivers earn a flat 80% of the calculated delivery fee for every job they successfully complete (i.e. status moves to `Pesanan Selesai`). The remaining 20% is retained by the platform. Earnings are immediately added to their historical dashboard summary once the order is completed.

### Overdue SLAs and Simulation
The system enforces the following Service Level Agreements (SLAs) for order shipping:
- **Instant:** Must be shipped on the same day (0 days grace period).
- **Next Day:** Must be shipped within 1 day.
- **Regular:** Must be shipped within 3 days.
If a Seller fails to process an order to `Menunggu Pengirim` within these SLAs, the order is automatically moved to the `Dikembalikan` (Returned/Refunded) status. The buyer's wallet balance is refunded, and the product stock is restored.
**Simulation:** Admins have a "Simulate Next Day" button on their dashboard. This artificially ages all incomplete orders by 1 day and triggers the Overdue verification job to demonstrate the SLA logic.

### Security Measures
- **SQL Injection:** Exclusively uses Laravel's Eloquent ORM and Query Builder which implements PDO parameter binding out-of-the-box.
- **XSS Prevention:** React automatically escapes all output. For raw HTML or user generated content like Application Reviews, the backend controller actively sanitizes the input using `strip_tags()` before saving to the database.
- **Role-Based Access Control (RBAC):** An `EnsureActiveRole` middleware is attached to all private routes. It aggressively verifies the `active_role` session variable against the required route prefix (e.g. `/buyer/*` requires `active_role === 'Buyer'`). It prevents users from manually typing a URL to bypass dashboards.
- **Input Validation:** Extensive use of Laravel's Request Validator (`$request->validate()`) to ensure no malformed data reaches the database.

## End-to-End Testing Guide

1. **Guest Browsing & Reviews:** Without logging in, browse the catalog on the homepage and submit a 5-star application review.
2. **Setup Users:** Register a new account or use the seeded `multi@seapedia.com` account. Login and select the **Buyer** role.
3. **Wallet & Checkout:** Navigate to the Wallet and top up your balance. Add an item from "Bintang Premium Seafood" to your cart. Apply a discount code (e.g. `SUMMER` promo) and complete the checkout.
4. **Seller Fulfillment:** Logout and login as `seller@seapedia.com`. Navigate to "Manage Orders". Find the incoming order and change the status to `Menunggu Pengirim` (Waiting for Driver).
5. **Driver Delivery:** Logout and login as `driver@seapedia.com`. Go to the Job Board, find the order, and click "Take Job" (status becomes `Sedang Dikirim`). Once delivered, click "Confirm Completion" (status becomes `Pesanan Selesai`).
6. **Admin Simulation (Optional):** Login as `admin@seapedia.com`. Click "Simulate Next Day" multiple times to observe any unprocessed orders getting automatically refunded and marked as `Dikembalikan`.

## API Documentation
Please refer to [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for a comprehensive list of all backend API endpoints.

## License
Proprietary / Internal.
