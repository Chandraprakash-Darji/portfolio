type IProject = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

export const projects: IProject[] = [
  {
    src: '/images/uproposalgpt.jpeg',
    alt: 'uProposalGPT screenshot',
    title: 'uProposalGPT',
    description:
      'AI-powered tool for creating professional proposals in minutes.',
  },
  {
    src: '/images/buildwithnext.jpeg',
    alt: 'Buildwithnext screenshot',
    title: 'Buildwithnext',
    description:
      'Advanced toolkit for building efficient and scalable SaaS applications.',
  },
];
