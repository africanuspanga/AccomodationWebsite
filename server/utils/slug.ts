/**
 * Utility functions for generating URL-friendly slugs
 */

/**
 * Generate a URL-friendly slug from a string
 * Example: "Four Seasons Safari Lodge" -> "four-seasons-safari-lodge"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate a unique slug by appending a random suffix
 * This ensures uniqueness when multiple items share the same name
 * Example: "four-seasons" -> "four-seasons-abc123"
 */
export function generateUniqueSlug(text: string): string {
  const baseSlug = generateSlug(text);
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${baseSlug}-${randomSuffix}`;
}

/**
 * Generate a slug with timestamp for guaranteed uniqueness
 * Example: "four-seasons" -> "four-seasons-1699012345"
 */
export function generateSlugWithTimestamp(text: string): string {
  const baseSlug = generateSlug(text);
  const timestamp = Date.now().toString(36);
  return `${baseSlug}-${timestamp}`;
}
