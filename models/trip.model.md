# Trip Model

## Table: `trips`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique identifier |
| customer_id | uuid | NOT NULL, FOREIGN KEY(`users.id`) | Customer who booked |
| vehicle_id | uuid | NOT NULL, FOREIGN KEY(`vehicles.id`) | Assigned vehicle |
| start_date | timestamptz | NOT NULL | Trip start time |
| end_date | timestamptz | - | Trip end time |
| location | text | - | Trip location |
| distance_km | numeric | NOT NULL | Distance in km |
| passengers | integer | NOT NULL | Number of passengers |
| tripCost | numeric | - | Total cost |
| isCompleted | boolean | DEFAULT `false` | Completion status |
| created_at | timestamptz | DEFAULT `now()` | Creation timestamp |

## Relationships
- **Customer** ← `users.id` (customer_id)
- **Vehicle** ← `vehicles.id` (vehicle_id)