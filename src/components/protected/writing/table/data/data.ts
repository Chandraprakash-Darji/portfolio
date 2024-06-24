import { PostType } from '@/lib/enums';
import {
  Pencil2Icon as DraftIcon,
  CheckCircledIcon as PublishedIcon,
} from '@radix-ui/react-icons';
import { FileText, LucideIcon, SquareDashedBottom } from 'lucide-react';

export const statuses = [
  {
    value: 'published',
    label: 'Published',
    icon: PublishedIcon,
  },
  {
    value: 'draft',
    label: 'Draft',
    icon: DraftIcon,
  },
];

export const postTypes: {
  value: keyof typeof PostType;
  label: string;
  icon: LucideIcon;
}[] = [
  {
    value: 'BLOG',
    label: 'Blog',
    icon: FileText,
  },
  {
    value: 'SNIPPET',
    label: 'Snippet',
    icon: SquareDashedBottom,
  },
];
