import type { IconType } from 'react-icons';
import {
  TbAntenna,
  TbApi,
  TbBrandAws,
  TbBrandAzure,
  TbBrandVscode,
  TbBrandWindows,
  TbBuildingBroadcastTower,
  TbChartDots3,
  TbChartHistogram,
  TbChartInfographic,
  TbCloud,
  TbCode,
  TbDatabase,
  TbFileSpreadsheet,
  TbMap2,
  TbPolygon,
  TbServer,
  TbTerminal2,
  TbWaveSine,
  TbWorldLatitude,
} from 'react-icons/tb';
import type {
  GenericIconKey,
  ResolvedSkillIcon,
} from '../../interfaces/skill-icon';

const GENERIC_ICONS: Record<GenericIconKey, IconType> = {
  antenna: TbAntenna,
  tower: TbBuildingBroadcastTower,
  wave: TbWaveSine,
  network: TbChartDots3,
  chart: TbChartHistogram,
  database: TbDatabase,
  terminal: TbTerminal2,
  server: TbServer,
  polygon: TbPolygon,
  map: TbMap2,
  globe: TbWorldLatitude,
  cloud: TbCloud,
  api: TbApi,
  code: TbCode,
  aws: TbBrandAws,
  azure: TbBrandAzure,
  vscode: TbBrandVscode,
  spreadsheet: TbFileSpreadsheet,
  dashboard: TbChartInfographic,
  windows: TbBrandWindows,
};

/** Relative luminance (0 = black, 1 = white) of a 6-digit hex colour. */
const luminance = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Colour classes for a brand logo that stay readable in both themes:
 * near-black logos turn light in dark mode, pale logos deepen in light mode.
 */
const brandColourClass = (hex: string) => {
  const l = luminance(hex);
  if (l < 0.06) return 'text-[var(--brand)] dark:text-foreground';
  if (l > 0.45)
    return 'text-[color-mix(in_oklab,var(--brand)_82%,black)] dark:text-[var(--brand)]';
  return 'text-[var(--brand)]';
};

export type SkillIconStyle = 'brand' | 'accent' | 'none';

/** Renders a skill's icon (resolved at build time), or nothing. */
const SkillIcon = ({
  icon,
  style,
  className = 'size-3.5 shrink-0',
}: {
  icon?: ResolvedSkillIcon;
  style: SkillIconStyle;
  className?: string;
}) => {
  if (!icon || style === 'none') return null;

  if (icon.kind === 'generic') {
    const Icon = GENERIC_ICONS[icon.key];
    return (
      <Icon
        aria-hidden
        className={`${className} ${style === 'brand' ? 'text-accent' : ''}`}
      />
    );
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className} ${style === 'brand' ? brandColourClass(icon.hex) : ''}`}
      style={
        style === 'brand'
          ? ({ '--brand': `#${icon.hex}` } as React.CSSProperties)
          : undefined
      }
    >
      <path d={icon.path} />
    </svg>
  );
};

export default SkillIcon;
