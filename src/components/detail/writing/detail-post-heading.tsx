import { FC } from 'react';

import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getMinutes } from '@/lib/utils';
import { CategoryModel, CompleteUser, PostModel } from '@/lib/zod';
import {
  ArchiveIcon,
  BarChart,
  CalendarIcon,
  ClockIcon,
  Heart,
} from 'lucide-react';
import { ReadTimeResults } from 'reading-time';
import { z } from 'zod';

interface DetailPostHeadingProps
  extends Pick<
    z.infer<typeof PostModel>,
    'title' | 'image' | 'imageBlurhash' | 'views' | 'likes'
  > {
  date: string;
  authorImage: CompleteUser['image'];
  authorName: CompleteUser['name'];
  categories: z.infer<typeof CategoryModel>[];
  readTime: ReadTimeResults;
}

const DetailPostHeading: FC<DetailPostHeadingProps> = async ({
  title,
  image,
  authorName,
  authorImage,
  imageBlurhash,
  date,
  categories,
  likes,
  views,
  readTime,
}) => {
  return (
    <section className="flex flex-col items-start justify-between gap-5 pt-5">
      <h1 className="h0 max-w-3xl overflow-hidden">{title}</h1>
      <div className="grid w-full grid-cols-2 justify-start gap-2 rounded-md border px-3 py-2.5 text-muted-foreground sm:inline-grid sm:grid-cols-[repeat(12,auto)] sm:border-0 sm:px-0 sm:py-0">
        {/* Author */}
        <div className="flex space-x-2">
          <Avatar className="flex h-[24px] w-[24px] rounded-full object-cover shadow-sm">
            <AvatarImage
              src={authorImage || undefined}
              alt={authorName || 'Avatar'}
            />
            <AvatarFallback> {authorName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-2 flex flex-col">
            <span className="text-md flex font-semibold text-muted-foreground">
              {authorName}
            </span>
          </div>
        </div>
        <Separator orientation="vertical" className="hidden sm:block" />
        {/* Date */}
        <div className="flex space-x-2">
          <p className="mt-0.5">
            <span className="sr-only">Date</span>
            <CalendarIcon
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
          </p>
          <span className="text-sm">{date}</span>
        </div>
        <Separator orientation="vertical" className="hidden sm:block" />
        {/* Category */}
        <div className="flex space-x-2">
          <p className="mt-0.5">
            <span className="sr-only">Category</span>
            <ArchiveIcon
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
          </p>
          <p className="text-sm">
            {categories.map((c) => (
              <span
                key={c.id}
                style={{
                  color: `hsl(${c.color})`,
                }}
              >
                {c.name}
              </span>
            ))}
          </p>
        </div>
        <Separator orientation="vertical" className="hidden sm:block" />
        {/* Reading time */}
        <div className="flex space-x-2">
          <p className="mt-0.5">
            <span className="sr-only">Minutes to read</span>
            <ClockIcon
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
          </p>
          <span className="text-sm">{getMinutes(readTime.minutes)}</span>
        </div>
        <Separator orientation="vertical" className="hidden sm:block" />
        {/* Reading time */}
        <div className="flex space-x-2">
          <p className="mt-0.5">
            <span className="sr-only">Total Likes</span>
            <Heart
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
          </p>
          <span className="text-sm">{likes}</span>
        </div>
        <Separator orientation="vertical" className="hidden sm:block" />
        {/* Reading time */}
        <div className="flex space-x-2">
          <p className="mt-0.5">
            <span className="sr-only">Total Views</span>
            <BarChart
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
          </p>
          <span className="text-sm">{views}</span>
        </div>
      </div>
      <div className="relative w-full">
        <Image
          src={image}
          alt={title}
          width={712}
          height={788}
          className="aspect-[1060/400] w-full rounded-2xl bg-muted object-cover object-center ring-1 ring-border"
          placeholder="blur"
          blurDataURL={imageBlurhash}
        />
      </div>
    </section>
  );
};

export default DetailPostHeading;
