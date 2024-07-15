import {
  At,
  Envelope,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  MagicWand,
  Scroll,
  SpinnerGap,
  XLogo,
} from '@phosphor-icons/react/dist/ssr';

export type IIcon = typeof XLogo;

export const Icons = {
  gitHub: GithubLogo,
  twitter: XLogo,
  linkedIn: LinkedinLogo,
  instagram: InstagramLogo,
  cv: Scroll,
  mail: Envelope,
  threads: At,
  pixelwand: MagicWand,
  loader: SpinnerGap,
} as const;
