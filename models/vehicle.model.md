# Vehicle Model

## Table: `vehicles`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique identifier |
| name | text | NOT NULL | Vehicle name |
| registration_number | text | NOT NULL, UNIQUE | Registration number |
| allowed_passengers | integer | NOT NULL | Max passengers |
| isAvailable | boolean | DEFAULT `true` | Availability status |
| driver_id | uuid | FOREIGN KEY(`users.id`) | Assigned driver |
| rate_per_km | numeric | NOT NULL | Rate per kilometer |
| owner_id | uuid | NOT NULL, FOREIGN KEY(`users.id`) | Vehicle owner |
| created_at | timestamptz | DEFAULT `now()` | Creation timestamp |

## Relationships
- **Owner** ← `users.id` (owner_id)
- **Driver** ← `users.id` (driver_id)