-- Ammunition tracking on a character's weapons (Current Mag / Mags Equipped / Additional Mags).
-- current_mag stays NULL until it first changes, which the page treats as "a full magazine".
ALTER TABLE character_weapons ADD COLUMN IF NOT EXISTS current_mag INTEGER;
ALTER TABLE character_weapons ADD COLUMN IF NOT EXISTS mags_equipped INTEGER DEFAULT 0;
ALTER TABLE character_weapons ADD COLUMN IF NOT EXISTS mags_additional INTEGER DEFAULT 0;
