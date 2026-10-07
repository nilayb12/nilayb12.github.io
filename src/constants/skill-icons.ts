import type { GenericIconKey } from '../interfaces/skill-icon';

/**
 * Tech stack icons are found AUTOMATICALLY at build time: each skill name is
 * matched against the 3,400+ brand logos in Simple Icons (https://simpleicons.org),
 * which come with the brand's official colour. Spelling it the way the brand
 * does is usually enough: 'Terraform', 'Kubernetes', 'Redis', 'C++', 'Go'.
 *
 * Matching ignores case, spaces and punctuation ('Node.js' = 'nodejs'), and
 * also tries 'Apache …' ('Airflow' finds Apache Airflow) and '….js'
 * ('Vue' finds Vue.js). The build log lists any skill it couldn't match.
 *
 * You only need this file for the exceptions below. Keys are the skill name
 * normalised: lower-case, spaces and punctuation removed.
 */

/**
 * Skill names that should use a different Simple Icons logo.
 * Value = the logo's slug (the end of its URL on simpleicons.org).
 */
export const SKILL_ALIASES: Record<string, string> = {
  java: 'openjdk', // Simple Icons lists Java as OpenJDK
  pyspark: 'apachespark',
  spark: 'apachespark',
  postgres: 'postgresql',
  maplibregl: 'maplibre',
  geojson: 'json',
  golang: 'go',
  k8s: 'kubernetes',
  js: 'javascript',
  ts: 'typescript',
  node: 'nodedotjs',
  gcp: 'googlecloud',
};

/**
 * Skills shown with a generic icon instead of a brand logo: concepts with
 * no logo, and products Simple Icons doesn't carry (Microsoft and Amazon
 * asked for theirs to be removed). These use your accent colour.
 * Available icons: see GENERIC_ICON_KEYS in src/interfaces/skill-icon.ts.
 */
export const SKILL_GENERIC: Record<string, GenericIconKey> = {
  // Telecom
  rankpianalytics: 'antenna',
  rankpis: 'antenna',
  ericssonnokiasamsungdata: 'tower',
  interferenceanalysis: 'wave',
  networkplanning: 'network',

  // Data
  sql: 'database',
  matplotlib: 'chart',

  // Geospatial
  shapely: 'polygon',
  gis: 'map',
  spatialindexing: 'globe',

  // Infrastructure
  bash: 'terminal',
  shell: 'terminal',
  xampp: 'server',
  restapis: 'api',

  // Not in Simple Icons
  aws: 'aws',
  amazonwebservices: 'aws',
  azure: 'azure',
  microsoftazure: 'azure',
  vscode: 'vscode',
  visualstudiocode: 'vscode',
  excel: 'spreadsheet',
  microsoftexcel: 'spreadsheet',
  powerbi: 'dashboard',
  tableau: 'dashboard',
  windows: 'windows',
};

export const normaliseSkill = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9+#]/g, '');
