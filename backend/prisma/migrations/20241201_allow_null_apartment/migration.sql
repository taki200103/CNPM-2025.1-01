-- Allow staff-like roles (admin, security, accountant, etc.) to exist
-- without being attached to a physical apartment unit.
ALTER TABLE "residents"
  ALTER COLUMN "ID_apartment" DROP NOT NULL;

