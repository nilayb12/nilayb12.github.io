'use client';

import {
  Button,
  ColorSwatchPicker,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
  buttonVariants,
  useIsHydrated,
  useTheme,
} from '@heroui/react';
import { useEffect, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { PiPaintBucket } from 'react-icons/pi';
import { RiComputerLine, RiMoonLine, RiSunLine } from 'react-icons/ri';
import { ACCENTS, ACCENT_STORAGE_KEY } from '../../constants/accents';
import { SanitizedThemeConfig } from '../../interfaces/sanitized-config';

const MODES = [
  { id: 'light', label: 'Light', icon: <RiSunLine /> },
  { id: 'dark', label: 'Dark', icon: <RiMoonLine /> },
  { id: 'system', label: 'System', icon: <RiComputerLine /> },
] as const;

// Frosted pill look shared by every control, so they stay readable over content.
// Every pill is exactly 40px tall (h-10) so they line up.
const PILL =
  'pointer-events-auto h-10 rounded-full border border-border/60 bg-surface/90 shadow-[var(--overlay-shadow)] backdrop-blur-md';

const compact = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

/** Applies an accent preset to the page (same logic as the pre-paint script). */
const applyAccent = (id: string, fallbackHex: string) => {
  const root = document.documentElement.style;
  const preset = ACCENTS.find((a) => a.id === id);
  if (preset && preset.id !== 'default') {
    root.setProperty('--accent', preset.hex);
    root.setProperty('--accent-foreground', preset.fg);
  } else if (fallbackHex) {
    root.setProperty('--accent', fallbackHex);
    root.removeProperty('--accent-foreground');
  } else {
    root.removeProperty('--accent');
    root.removeProperty('--accent-foreground');
  }
};

/**
 * Fixed, transparent header in the top-right corner: accent palette,
 * light/dark/system switch and a GitHub link. Stays in place on scroll.
 */
const SiteHeader = ({
  themeConfig,
  githubUsername,
  githubCount,
  githubCountLabel,
}: {
  themeConfig: SanitizedThemeConfig;
  githubUsername: string;
  githubCount?: number;
  githubCountLabel?: string;
}) => {
  const { theme, setTheme } = useTheme(themeConfig.defaultTheme);
  const hydrated = useIsHydrated();
  const [accent, setAccent] = useState<string>('default');

  // Read the saved accent once in the browser (the pre-paint script already applied it).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAccent(localStorage.getItem(ACCENT_STORAGE_KEY) || 'default');
  }, []);

  const selected = ACCENTS.find((a) => a.id === accent) ?? ACCENTS[0];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-end gap-2 px-4 pt-4 lg:px-10">
        {!themeConfig.disableSwitch && (
          <>
            <Popover>
              <Button
                variant="tertiary"
                className={`${PILL} gap-2`}
                aria-label="Choose accent colour"
              >
                <PiPaintBucket className="text-base" />
                <span className="max-sm:hidden">Theme</span>
              </Button>
              <Popover.Content placement="bottom end">
                <Popover.Dialog>
                  <Popover.Heading className="text-sm font-medium">
                    Accent colour
                  </Popover.Heading>
                  <p className="mb-3 text-xs text-muted">{selected.label}</p>
                  <ColorSwatchPicker
                    aria-label="Accent colour"
                    value={selected.hex}
                    onChange={(color) => {
                      const hex = color.toString('hex').toLowerCase();
                      const next = ACCENTS.find(
                        (a) => a.hex.toLowerCase() === hex,
                      );
                      if (!next) return;
                      setAccent(next.id);
                      localStorage.setItem(ACCENT_STORAGE_KEY, next.id);
                      applyAccent(next.id, themeConfig.accentColor);
                    }}
                  >
                    {ACCENTS.map((a) => (
                      <ColorSwatchPicker.Item
                        key={a.id}
                        color={a.hex}
                        aria-label={a.label}
                      >
                        <ColorSwatchPicker.Swatch />
                      </ColorSwatchPicker.Item>
                    ))}
                  </ColorSwatchPicker>
                </Popover.Dialog>
              </Popover.Content>
            </Popover>

            <ToggleButtonGroup
              aria-label="Colour mode"
              selectionMode="single"
              disallowEmptySelection
              size="sm"
              className={`${PILL} gap-0.5 p-1`}
              selectedKeys={hydrated ? [theme] : []}
              onSelectionChange={(keys) => {
                const next = [...keys][0];
                if (next) setTheme(String(next));
              }}
            >
              {MODES.map((m) => (
                <ToggleButton
                  key={m.id}
                  id={m.id}
                  isIconOnly
                  variant="ghost"
                  aria-label={m.label}
                  className="size-8 min-w-0 rounded-full text-muted [&:not([data-selected=true])]:bg-transparent [&:not([data-selected=true])]:hover:text-foreground data-[selected=true]:bg-default data-[selected=true]:text-foreground data-[selected=true]:shadow-sm"
                >
                  {m.icon}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </>
        )}

        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noreferrer"
          aria-label={
            githubCount
              ? `GitHub: ${githubCount} ${githubCountLabel}`
              : `GitHub profile`
          }
          title={githubCount ? `${githubCount} ${githubCountLabel}` : undefined}
          className={`${buttonVariants({ variant: 'tertiary' })} ${PILL} gap-2`}
        >
          <AiFillGithub className="text-lg" />
          {githubCount ? (
            compact.format(githubCount)
          ) : (
            <span className="max-sm:hidden">GitHub</span>
          )}
        </a>
      </div>
    </header>
  );
};

export default SiteHeader;
