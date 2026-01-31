# User Model

## Table: `users`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique identifier |
| name | text | NOT NULL | User full name |
| email | text | NOT NULL, UNIQUE | Unique email address |
| password | text | NOT NULL | Raw password (no hashing) |
| role | text | NOT NULL, CHECK(`role IN ('customer', 'owner', 'driver')`) | User role |
| created_at | timestamptz | DEFAULT `now()` | Creation timestamp |

## Relationships
- **Owner** → `vehicles.owner_id`
- **Driver** → `vehicles.driver_id` 
- **Customer** → `trips.customer_id`