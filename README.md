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

## Development & Testing Notes

- **SLA Simulation**: Admins can test the automated overdue order rules by clicking the "Simulate Next Day (SLA)" button on their dashboard. This advances the creation date of all incomplete orders and cancels/refunds those exceeding their shipping method SLA.
- **Design Language**: All UI modifications must adhere strictly to the guidelines defined in `DESIGN.md`.

## License
Proprietary / Internal.
