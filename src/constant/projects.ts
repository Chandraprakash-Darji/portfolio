type IProjectKey = 'src' | 'alt' | 'title' | 'description' | 'href';

export type IProject = Record<IProjectKey, string> & {
  tags: string[];
};

export const projects: IProject[] = [
  {
    src: '/images/drafton.png',
    alt: 'Drafton screenshot',
    title: 'Drafton.io',
    description:
      'Automates proposal creation & manage streamlined workflow. Create business proposals and manage the entire workflow from 0 to 1 using AI by streamlining the proposal process.',
    href: 'https://drafton.io/',
    tags: ['AI', 'Development'],
  },
  {
    src: '/images/valuemetrix.png',
    alt: 'Valuemetrix screenshot',
    title: 'Valuemetrix',
    description:
      'Valuemetrix is an advanced investment platform that enhances decision-making with real-time analytics and predictive modeling. Simplify data analysis to efficiently uncover valuable investment opportunities and make informed choices.',
    href: 'https://www.valuemetrix.io/',
    tags: ['AI', 'Invesment'],
  },
];
