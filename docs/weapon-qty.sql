-- Quantity on a character's grenades, explosives and other counted items.
-- NULL means "not a counted item" (guns); the page shows a Quantity line when it is set.
ALTER TABLE character_weapons ADD COLUMN IF NOT EXISTS qty INTEGER;
