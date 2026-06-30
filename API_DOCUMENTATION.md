# SEAPEDIA API Documentation

This document outlines the major API endpoints utilized by the frontend React application. The backend operates as a stateful API relying on Laravel Sanctum/Session cookies for authentication and CSRF protection.

## Authentication & Authorization
- `POST /register` - Register a new user.
- `POST /login` - Authenticate a user.
- `POST /logout` - Invalidate session and logout.
- `POST /role-selection` - Set the `active_role` in the session for multi-role accounts.

## Public Endpoints
- `GET /` - Fetch application reviews and the top products for the landing page catalog.
- `POST /reviews` - Submit a new application review (Guest allowed).
- `GET /products/{product}` - Fetch read-only product details and associated store information.

## Buyer Endpoints
*Requires `active_role` = Buyer*
- `GET /buyer/wallet` - Fetch wallet balance and transaction history.
- `POST /buyer/wallet/topup` - Top up wallet balance.
- `GET /buyer/cart` - Fetch current cart and items.
- `POST /buyer/cart` - Add an item to the cart (enforces single-store rule).
- `PUT /buyer/cart/{cartItem}` - Update item quantity.
- `DELETE /buyer/cart/{cartItem}` - Remove item from cart.
- `POST /buyer/checkout/validate-discount` - Validate a Voucher/Promo code and return calculated discount.
- `POST /buyer/checkout` - Process the cart into an Order, deduct wallet balance, reduce stock, and record transactions.
- `GET /buyer/orders` - List all buyer orders with status history.

## Seller Endpoints
*Requires `active_role` = Seller*
- `GET /seller/dashboard` - Fetch seller revenue, order count, and recent activity.
- `POST /seller/store` - Create or update store profile (unique name enforced).
- `GET /seller/products` - List seller's products.
- `POST /seller/products` - Create a new product.
- `PUT /seller/products/{product}` - Update a product.
- `DELETE /seller/products/{product}` - Delete a product.
- `GET /seller/orders` - View incoming orders.
- `PUT /seller/orders/{order}` - Update order status (e.g. advance to `Menunggu Pengirim`).

## Driver Endpoints
*Requires `active_role` = Driver*
- `GET /driver/jobs` - List jobs available to be taken (`Menunggu Pengirim`).
- `POST /driver/jobs/{order}/take` - Assign job to the authenticated driver.
- `POST /driver/jobs/{order}/complete` - Mark job as complete (`Pesanan Selesai`) and credit earnings.

## Admin Endpoints
*Requires `active_role` = Admin*
- `GET /admin/dashboard` - Fetch aggregate marketplace metrics.
- `POST /admin/simulate-next-day` - Trigger the overdue SLA logic to auto-refund stale orders.
- `GET /admin/vouchers` - List all Vouchers and Promos.
- `POST /admin/vouchers` - Generate a new Voucher or Promo code.
