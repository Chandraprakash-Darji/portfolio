type IProjectKey = 'src' | 'alt' | 'title' | 'description' | 'href';

export type IProject = Record<IProjectKey, string>;

export const projects: IProject[] = [
  {
    src: '/images/uproposalgpt.jpeg',
    alt: 'Drafton screenshot',
    title: 'Drafton.io',
    description:
      'Automates proposal creation & manage streamlined workflow. Create business proposals and manage the entire workflow from 0 to 1 using AI by streamlining the proposal process.',
    href: 'https://drafton.io/',
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
