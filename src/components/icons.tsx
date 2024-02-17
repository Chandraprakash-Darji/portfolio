import {
  AtSign,
  GithubIcon,
  Instagram,
  Linkedin,
  LucideIcon,
  Mail,
  ScrollText,
  Twitter,
  Wand,
} from 'lucide-react';

export type IIcon = LucideIcon;

export const Icons = {
  gitHub: GithubIcon,
  twitter: Twitter,
  linkedIn: Linkedin,
  instagram: Instagram,
  cv: ScrollText,
  mail: Mail,
  threads: AtSign,
  pixelwand: Wand,
} as const;
