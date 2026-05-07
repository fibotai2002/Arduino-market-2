# RoboStore Security Specification

## Data Invariants
1. **Products**: Products can be viewed by anyone. Only admins can modify them.
2. **Orders**: Anyone can create an order. Orders require a valid name, phone, and address.
3. **Immutability**: Order total and items cannot be changed once created. Status can only be changed by admins.

## The Dirty Dozen Payloads
1. Create a product as a normal user.
2. Update product price as a normal user.
3. Delete a product as a normal user.
4. Create an order with a 1MB string in `customerInfo.name`.
5. Create an order with a negative price total.
6. Create an order with missing `customerInfo`.
7. Update an existing order's `total` amount.
8. Update an existing order's `status` as a non-admin.
9. List all orders as a non-admin.
10. Read someone else's order by ID (if not an admin).
11. Inject a ghost field `isAdmin: true` into a profile (if users had profiles).
12. Use a 2KB string as a product ID.
