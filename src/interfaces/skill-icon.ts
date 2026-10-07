/** Keys for the generic (non-brand) icons; see src/components/skill-icon. */
export const GENERIC_ICON_KEYS = [
  'antenna',
  'tower',
  'wave',
  'network',
  'chart',
  'database',
  'terminal',
  'server',
  'polygon',
  'map',
  'globe',
  'cloud',
  'api',
  'code',
  'aws',
  'azure',
  'vscode',
  'spreadsheet',
  'dashboard',
  'windows',
] as const;

export type GenericIconKey = (typeof GENERIC_ICON_KEYS)[number];

/** An icon resolved at build time for one skill. */
export type ResolvedSkillIcon =
  | { kind: 'brand'; title: string; path: string; hex: string }
  | { kind: 'generic'; key: GenericIconKey };
