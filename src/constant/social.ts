import { Icons } from '@/components/icons';

type ISocial = {
  name: keyof typeof Icons;
  url: string;
};

export const social: ISocial[] = [
  {
    name: 'gitHub',
    url: 'https://github.com/chandraprakash-darji',
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/chandra_7852',
  },
  {
    name: 'linkedIn',
    url: 'https://www.linkedin.com/in/chandraprakash-darji/',
  },
  {
    name: 'mail',
    url: 'mailto:prakashchandra3786@gmail.com',
  },
];
