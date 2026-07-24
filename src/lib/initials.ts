// Derives up to two uppercase initials from a display name,
// e.g. "Brad Traversy" -> "BT", "madonna" -> "M".
// Falls back to "?" when there is nothing usable to derive from.
export function getInitials(name?: string | null): string {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (parts.length === 0) {
    return "?";
  }

  // One word -> first letter only. Multiple -> first + last word's letter,
  // so "Ada B. Lovelace" reads as "AL" rather than "AB".
  const letters =
    parts.length === 1
      ? [parts[0][0]]
      : [parts[0][0], parts[parts.length - 1][0]];

  return letters.join("").toUpperCase();
}
