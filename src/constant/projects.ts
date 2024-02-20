type IProjectKey = 'src' | 'alt' | 'title' | 'description' | 'href';

export type IProject = Record<IProjectKey, string>;

export const projects: IProject[] = [
  {
    src: '/images/uproposalgpt.jpeg',
    alt: 'uProposalGPT screenshot',
    title: 'uProposalGPT',
    description:
      'AI-powered tool for creating professional proposals in minutes.',
    href: 'https://uproposalgpt.com/',
  },
  {
    src: '/images/buildwithnext.jpeg',
    alt: 'Buildwithnext screenshot',
    title: 'Buildwithnext',
    description:
      'Advanced toolkit for building efficient and scalable SaaS applications.',
    href: 'https://www.buildwithnext.io/',
  },
];
