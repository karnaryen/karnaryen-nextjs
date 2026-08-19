export interface TechInfo {
  name: string;
  icon: string;
  /** Monochrome black marks need inverting to stay visible in dark mode. */
  invertOnDark?: boolean;
}

/**
 * Registry of technologies. Add or remove entries here — the About page
 * renders them in insertion order. Reference individual items by id
 * (e.g. for project descriptions): <TechStack ids={['angular', 'tailwind']} />
 */
export const tech = {
  html: { name: 'HTML', icon: '/tech/html.svg' },
  css: { name: 'CSS', icon: '/tech/css3.svg' },
  javascript: { name: 'JavaScript', icon: '/tech/js.svg' },
  tailwind: { name: 'Tailwind', icon: '/tech/tailwind-css.svg' },
  typescript: { name: 'TypeScript', icon: '/tech/typescript.svg' },
  react: { name: 'React', icon: '/tech/react.svg' },
  nextjs: { name: 'Next.js', icon: '/tech/nextjs.svg', invertOnDark: true },
  shadcn: { name: 'shadcn/ui', icon: '/tech/shadcn-ui.svg', invertOnDark: true },
  mui: { name: 'MUI', icon: '/tech/mui.svg' },
  storybook: { name: 'Storybook', icon: '/tech/storybook.svg' },
  figma: { name: 'Figma', icon: '/tech/figma.svg' },
  claudeCode: { name: 'Claude Code', icon: '/tech/claude.svg' },
  openai: { name: 'OpenAI', icon: '/tech/openai.svg', invertOnDark: true },
  angular: { name: 'Angular', icon: '/tech/angular.svg' },
  docker: { name: 'Docker', icon: '/tech/docker.svg' },
} as const satisfies Record<string, TechInfo>;

export type TechId = keyof typeof tech;

export const techStackIds = Object.keys(tech) as TechId[];
