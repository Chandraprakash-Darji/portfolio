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
    name: 'instagram',
    url: 'https://www.instagram.com/chandraprakash_7852/',
  },
  {
    name: 'cv',
    url: 'https://regaldo.notion.site/Chandraprakash-Darji-dbe0fe8ab47245f59f54786f2a4e5055?pvs=4',
  },
  {
    name: 'mail',
    url: 'mailto:prakashchandra3786@gmail.com',
  },
  {
    name: 'threads',
    url: 'https://www.threads.net/@chandraprakash_7852',
  },
  {
    name: 'pixelwand',
    url: 'https://pixelwand.live/',
  },
];
