'use server';
import { z } from 'zod';

import { ActionState, createSafeAction } from '@/lib/create-safe-action';
import {
  activateLicenseKey,
  getLicenseKey,
  inviteMemberToRepository,
} from '@/lib/query/lemon-squeezy/utils';

const ZActivateLicenseOptions = z.object({
  license_key: z.string(),
  username: z.string(),
});

type InputType = z.infer<typeof ZActivateLicenseOptions>;
type ReturnType = ActionState<InputType, boolean>;

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { license_key, username } = data;

  try {
    // validate key
    await validateLicenseKey(license_key);

    // invite user to github
    await inviteUserToRepositories(username);

    // activate license key
    const activation = await activateLicenseKey({
      licenseKey: license_key,
      instanceName: username,
    });

    if (activation.activated) {
      return {
        data: true,
      };
    }

    return {
      error: `Error activating license`,
    };
  } catch (error) {
    return {
      error:
        'message' in (error as Error)
          ? (error as Error).message
          : 'An error occurred',
    };
  }
};

async function validateLicenseKey(licenseKey: string) {
  const response = await getLicenseKey({
    licenseKey,
  });

  if (!response || !response.valid) {
    throw Error(`Invalid license key`);
  }

  const limit = response.license_key.activation_limit;
  const count = response.license_key.activation_usage;
  console.log('count', { limit, count });
  if (count >= limit) {
    throw Error(`License key has reached its activation limit`);
  }
}

async function inviteUserToRepositories(username: string) {
  const repositories = ['portfolio'] as string[];

  // add the Github username of the owner of the repositories to your .env file
  const owner = process.env.GITHUB_OWNER;

  if (!owner) {
    throw Error(`No owner found in environment variables`);
  }

  console.log({ repositories });

  const requests = repositories.filter(Boolean).map((repository) => {
    return inviteMemberToRepository({
      owner,
      repo: repository,
      username,
    });
  });

  return Promise.allSettled(requests);
}

export const activateLicense = createSafeAction(
  ZActivateLicenseOptions,
  handler
);
