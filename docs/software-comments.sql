-- Free-text comments on a character's computer software (Tech tab).
-- The existing `note` column is reserved for automatic TL / bandwidth warnings.
ALTER TABLE character_computer_software ADD COLUMN IF NOT EXISTS comments TEXT;
