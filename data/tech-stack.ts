export interface TechInfo {
  name: string;
  /** Omit for tools without a logo; the badge then shows just the name. */
  icon?: string;
  /** Monochrome black marks need inverting to stay visible in dark mode. */
  invertOnDark?: boolean;
  /** Hide from the full stack on the homepage; still usable in project stacks. */
  projectOnly?: boolean;
}

/**
 * Registry of technologies. Add or remove entries here — the About page
 * renders them in insertion order. Reference individual items by id
 * (e.g. for project descriptions): <TechStack ids={['angular', 'tailwind']} />
 */
export const tech = {
  react: { name: 'React', icon: '/tech/react.svg' },
  nextjs: { name: 'Next.js', icon: '/tech/nextjs.svg', invertOnDark: true },
  angular: { name: 'Angular', icon: '/tech/angular.svg' },
  javascript: { name: 'JavaScript', icon: '/tech/js.svg' },
  typescript: { name: 'TypeScript', icon: '/tech/typescript.svg' },
  tailwind: { name: 'Tailwind CSS', icon: '/tech/tailwind-css.svg' },
  claudeCode: { name: 'Claude Code', icon: '/tech/claude.svg' },
  claudeDesign: { name: 'Claude Design', icon: '/tech/claude.svg', projectOnly: true },
  openai: { name: 'OpenAI', icon: '/tech/openai.svg', invertOnDark: true },
  html: { name: 'HTML', icon: '/tech/html.svg' },
  css: { name: 'CSS', icon: '/tech/css3.svg' },
  mui: { name: 'MUI', icon: '/tech/mui.svg' },
  shadcn: { name: 'shadcn/ui', icon: '/tech/shadcn-ui.svg', invertOnDark: true },
  storybook: { name: 'Storybook', icon: '/tech/storybook.svg' },
  figma: { name: 'Figma', icon: '/tech/figma.svg' },
  docker: { name: 'Docker', icon: '/tech/docker.svg' },
  git: { name: 'Git', icon: '/tech/git.svg' },
  hostnet: { name: 'Hostnet', icon: '/tech/hostnet.png', projectOnly: true },
} as const satisfies Record<string, TechInfo>;

export type TechId = keyof typeof tech;

export const techStackIds = (Object.keys(tech) as TechId[]).filter(
  (id) => !(tech[id] as TechInfo).projectOnly,
);
