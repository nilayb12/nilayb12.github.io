interface Github {
  /**
   * GitHub org/user name
   */
  username: string;
}

interface GitHubProjects {
  /**
   * Display GitHub projects?
   */
  display?: boolean;

  /**
   * Header
   */
  header?: string;

  /**
   * 'automatic' | 'manual'
   */
  mode?: string;

  /**
   * Config of automatic mode
   */
  automatic?: {
    /**
     * 'stars' | 'updated'
     */
    sortBy?: string;

    /**
     * How many projects to display
     */
    limit?: number;

    /**
     * Exclude projects option
     */
    exclude?: {
      /**
       * Forked projects will not be displayed if set to true
       */
      forks?: boolean;

      /**
       * These projects will not be displayed
       *
       * example: ['my-project1', 'my-project2']
       */
      projects?: Array<string>;
    };
  };

  /**
   * Config of manual mode
   */
  manual?: {
    /**
     * These projects will be displayed
     *
     * example: ['my-project1', 'my-project2']
     */
    projects?: Array<string>;
  };
}

interface ExternalProjects {
  /**
   * Header
   */
  header?: string;

  /**
   * Project list
   */
  projects?: {
    title: string;
    description?: string;
    imageUrl?: string;
    link: string;
  }[];
}

interface Projects {
  github?: GitHubProjects;

  external?: ExternalProjects;
}

interface SEO {
  /**
   * Meta title
   */
  title?: string;

  /**
   * Meta description
   */
  description?: string;

  /**
   * Meta image
   */
  imageURL?: string;
}

interface Social {
  /**
   * LinkedIn
   */
  linkedin?: string;

  /**
   * X (formerly Twitter)
   */
  x?: string;

  /**
   * Mastodon
   */
  mastodon?: string;

  /**
   * ResearchGate username
   */
  researchGate?: string;

  /**
   * Facebook
   */
  facebook?: string;

  /**
   * Instagram
   */
  instagram?: string;

  /**
   * Reddit
   */
  reddit?: string;

  /**
   * Threads
   */
  threads?: string;

  /**
   * YouTube
   */
  youtube?: string;

  /**
   * Udemy
   */
  udemy?: string;

  /**
   * Dribbble
   */
  dribbble?: string;

  /**
   * Behance
   */
  behance?: string;

  /**
   * Medium
   */
  medium?: string;

  /**
   * dev
   */
  dev?: string;

  /**
   * Stack Overflow
   */
  stackoverflow?: string;

  /**
   * Website
   */
  website?: string;

  /**
   * Telegram username
   */
  telegram?: string;

  /**
   * Phone
   */
  phone?: string;

  /**
   * Email
   */
  email?: string;

  /**
   * Discord username
   */
  discord?: string;
}

interface Resume {
  /**
   * Resume file url
   */
  fileUrl?: string;
}

interface Experience {
  company?: string;
  position?: string;
  from: string;
  to: string;
  companyLink?: string;
  /**
   * What you did in the role. A list of strings renders as bullet points;
   * a single string renders as a paragraph.
   */
  description?: string | string[];
}

interface Certification {
  body?: string;
  name?: string;
  year?: string;
  link?: string;
}

interface Education {
  institution?: string;
  degree?: string;
  from: string;
  to: string;
  /**
   * Optional: grade, specialisation, thesis, etc. A list renders as bullets.
   */
  description?: string | string[];
}

interface Publication {
  title: string;
  conferenceName?: string;
  journalName?: string;
  authors?: string;
  link?: string;
  description?: string;
}

interface GoogleAnalytics {
  /**
   * GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
   */
  id?: string;
}

interface Hotjar {
  /**
   * Hotjar id
   */
  id?: string;

  /**
   * Snippet Version
   */
  snippetVersion?: number;
}

interface Blog {
  /**
   * medium | dev
   */
  source?: string;

  /**
   * Username
   */
  username?: string;

  /**
   * How many articles to display
   *
   * Max is 10
   */
  limit?: number;
}

interface ThemeConfig {
  /**
   * 'system' (follow the visitor's OS), 'light' or 'dark'
   */
  defaultTheme?: 'system' | 'light' | 'dark';

  /**
   * Hides the light/dark switch
   */
  disableSwitch?: boolean;

  /**
   * Show a ring around the profile picture
   */
  displayAvatarRing?: boolean;

  /**
   * Brand/accent colour (any CSS colour). Empty keeps HeroUI's default blue.
   */
  accentColor?: string;

  /**
   * Tech stack icons: 'brand' (official logo colours), 'accent' (your accent
   * colour), or 'none'
   */
  skillIcons?: 'brand' | 'accent' | 'none';
}

interface HeaderConfig {
  /**
   * Number shown on the GitHub button in the header:
   * 'stars' (total across your repos), 'followers', or 'none'
   */
  githubCount?: 'stars' | 'followers' | 'none';
}

interface Config {
  /**
   * GitHub config
   */
  github: Github;

  /**
   * Vite's base url
   */
  base?: string;

  /**
   * Projects config
   */
  projects?: Projects;

  /**
   * SEO config
   */
  seo?: SEO;

  /**
   * Social links
   */
  social?: Social;

  /**
   * Skill list
   */
  skills?: Array<string>;

  /**
   * Experience list
   */
  experiences?: Array<Experience>;

  /**
   * Certifications list
   */
  certifications?: Array<Certification>;

  /**
   * Education list
   */
  educations?: Array<Education>;

  /**
   * Publication list
   */
  publications?: Array<Publication>;

  /**
   * Resume
   */
  resume?: Resume;

  /**
   * Google Analytics config
   */
  googleAnalytics?: GoogleAnalytics;

  /**
   * Hotjar config
   */
  hotjar?: Hotjar;

  /**
   * Blog config
   */
  blog?: Blog;

  /**
   * Theme config
   */
  themeConfig?: ThemeConfig;

  /**
   * Top-right header
   */
  header?: HeaderConfig;

  /**
   * Custom footer
   */
  footer?: string;
}

declare const CONFIG: Config;
