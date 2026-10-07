import 'server-only';
import * as simpleIcons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';
import {
  SKILL_ALIASES,
  SKILL_GENERIC,
  normaliseSkill,
} from '../constants/skill-icons';
import type { ResolvedSkillIcon } from '../interfaces/skill-icon';

// Runs only at build time, so the full Simple Icons set never reaches visitors:
// just the path and colour of each matched logo is embedded in the page.

const all = Object.values(simpleIcons).filter(
  (v): v is SimpleIcon => typeof v === 'object' && v !== null && 'slug' in v,
);
const bySlug = new Map(all.map((i) => [i.slug, i]));
const byTitle = new Map<string, SimpleIcon>();
for (const icon of all) {
  const key = normaliseSkill(icon.title);
  if (!byTitle.has(key)) byTitle.set(key, icon);
}

const findBrand = (n: string): SimpleIcon | undefined =>
  byTitle.get(n) ??
  bySlug.get(n) ??
  byTitle.get(`apache${n}`) ?? // 'Airflow' -> Apache Airflow
  byTitle.get(`${n}js`); // 'Vue' -> Vue.js

/** Finds an icon for every skill; skills with no match are left out. */
export function resolveSkillIcons(
  skills: string[],
): Record<string, ResolvedSkillIcon> {
  const result: Record<string, ResolvedSkillIcon> = {};
  const unmatched: string[] = [];

  for (const skill of skills) {
    const n = normaliseSkill(skill);
    if (SKILL_GENERIC[n]) {
      result[skill] = { kind: 'generic', key: SKILL_GENERIC[n] };
      continue;
    }
    const icon = SKILL_ALIASES[n] ? bySlug.get(SKILL_ALIASES[n]) : findBrand(n);
    if (icon) {
      result[skill] = {
        kind: 'brand',
        title: icon.title,
        path: icon.path,
        hex: icon.hex,
      };
    } else {
      unmatched.push(skill);
    }
  }

  if (unmatched.length) {
    console.log(
      `[skills] No icon found for: ${unmatched.join(', ')}. ` +
        'Add them to src/constants/skill-icons.ts to give them one.',
    );
  }
  return result;
}
