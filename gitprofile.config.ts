// gitprofile.config.ts — everything on the site is driven from this file.

const CONFIG = {
  github: {
    username: 'nilayb12', // The only required field.
  },

  /**
   * '/'           if the repo is nilayb12/nilayb12.github.io  -> https://nilayb12.github.io/
   * '/<repo>/'    for any other repo name                     -> https://nilayb12.github.io/<repo>/
   */
  base: '/',

  projects: {
    github: {
      display: true,
      header: 'Selected repositories',
      mode: 'manual', // 'automatic' (top repos by stars/updated) or 'manual'
      automatic: {
        sortBy: 'stars', // 'stars' | 'updated'
        limit: 6,
        exclude: {
          forks: true,
          projects: [], // e.g. ['nilayb12/some-repo']
        },
      },
      manual: {
        // Your repositories of choice, in 'owner/repo' form.
        projects: ['nilayb12/Cheatsheet', 'nilayb12/Hangman'],
      },
    },
    external: {
      header: 'Other work',
      // Non-GitHub work (e.g. a write-up or demo). Leave empty to hide the section.
      projects: [] as {
        title: string;
        description?: string;
        imageUrl?: string;
        link: string;
      }[],
    },
  },

  seo: {
    title: 'Nilay Baranwal',
    description:
      'Telecom network data engineer — RAN data pipelines, geospatial analytics and web tooling.',
    imageURL: '',
  },

  // Fill in only what you want public. Empty strings are hidden.
  social: {
    linkedin: '', // just the handle, e.g. 'nilay-baranwal'
    x: '',
    mastodon: '',
    researchGate: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '',
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '',
    discord: '',
    telegram: '',
    website: '',
    phone: '',
    email: '', // a personal address, not your work one
  },

  resume: {
    // Put resume.pdf in /public and set this to '/resume.pdf'. Empty hides the button.
    fileUrl: '',
  },

  skills: [
    'Python',
    'PySpark',
    'Databricks',
    'SQL',
    'PostgreSQL',
    'RAN KPI analytics',
    'Ericsson / Nokia / Samsung data',
    'Interference analysis',
    'Shapely',
    'GeoJSON',
    'MapLibre GL',
    'JavaScript',
    'Node.js',
    'PHP',
    'Apache',
    'WebRTC',
    'Rust',
    'Java',
    'Git',
    'GitHub Actions',
  ],

  // Most recent first. `description` can be a list (bullet points) or a
  // single string (paragraph). Keep each point to one line if you can.
  experiences: [
    {
      company: 'Jio Platforms',
      position: 'Your job title', // TODO
      from: 'Month YYYY', // TODO
      to: 'Present',
      companyLink: 'https://www.jio.com/platforms',
      // TODO: review — keep only what you're comfortable making public.
      description: [
        'Designed a sector-packing algorithm on Databricks that models sector coverage geometry at national scale.',
        'Built a pipeline ingesting interference reference-signal traces into the central data lake for RIM analysis.',
        'Delivered RAN KPI analytics across Ericsson, Nokia and Samsung equipment.',
        'Built a map-based web app for visualising sector coverage across India.',
        'Administer the TRAI MySpeed server (Apache, Node.js, WebRTC).',
      ],
    },
  ],

  certifications: [] as {
    body?: string;
    name?: string;
    year?: string;
    link?: string;
  }[],

  educations: [
    {
      institution: 'Institution', // TODO
      degree: 'Degree', // TODO
      from: 'YYYY',
      to: 'YYYY',
      // Optional, e.g. 'Specialisation in signal processing'
      description: '',
    },
  ],

  publications: [] as {
    title: string;
    conferenceName?: string;
    journalName?: string;
    authors?: string;
    link?: string;
    description?: string;
  }[],

  // Show posts from Medium or dev.to. Empty username hides the section.
  blog: {
    source: 'dev', // 'medium' | 'dev'
    username: '',
    limit: 2,
  },

  googleAnalytics: { id: '' },
  hotjar: { id: '', snippetVersion: 6 },

  // Buttons fixed to the top-right corner.
  header: {
    // Number on the GitHub button: 'stars' (total across your repos),
    // 'followers', or 'none' to show just the icon.
    githubCount: 'stars' as 'stars' | 'followers' | 'none',
  },

  themeConfig: {
    // 'system' follows the visitor's OS setting; or force 'light' / 'dark'.
    defaultTheme: 'system' as 'system' | 'light' | 'dark',
    disableSwitch: false, // hide the light/dark/system switch
    displayAvatarRing: true,
    // Starting accent colour (any CSS colour). Visitors can also pick a
    // palette from the "Theme" button. Empty = HeroUI's default blue.
    accentColor: '',
    // Tech stack icons: 'brand' (official logo colours), 'accent' (your
    // accent colour, matching the chips), or 'none'.
    skillIcons: 'brand' as 'brand' | 'accent' | 'none',
  },

  // Plain text or HTML. Keeping the credit is appreciated (MIT licence).
  footer: `Built with <a href="https://github.com/arifszn/gitprofile" target="_blank" rel="noreferrer">GitProfile</a>, Next.js and <a href="https://heroui.com" target="_blank" rel="noreferrer">HeroUI</a>`,
};

export default CONFIG;
