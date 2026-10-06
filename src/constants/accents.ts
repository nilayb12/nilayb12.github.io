/**
 * Accent palettes offered by the "Theme" button in the header.
 * `fg` is the text colour used on top of the accent (buttons etc.).
 * The first entry is the default (HeroUI's own blue).
 */
export const ACCENTS = [
  { id: 'default', label: 'Default', hex: '#2f80ed', fg: '#ffffff' },
  { id: 'sky', label: 'Sky', hex: '#0ea5e9', fg: '#ffffff' },
  { id: 'lavender', label: 'Lavender', hex: '#8b5cf6', fg: '#ffffff' },
  { id: 'mint', label: 'Mint', hex: '#10b981', fg: '#ffffff' },
  { id: 'rose', label: 'Rose', hex: '#e11d48', fg: '#ffffff' },
  { id: 'amber', label: 'Amber', hex: '#f59e0b', fg: '#1c1917' },
  { id: 'graphite', label: 'Graphite', hex: '#52525b', fg: '#ffffff' },
] as const;

export type AccentId = (typeof ACCENTS)[number]['id'];

export const ACCENT_STORAGE_KEY = 'portfolio-accent';
