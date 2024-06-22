import { userMetadataSchema } from '@/lib/zod-utils';
import { Prisma } from '@prisma/client';

export const handleUserMetadata = (metadata: Prisma.JsonValue) => {
  return userMetadataSchema.parse(metadata);
};
