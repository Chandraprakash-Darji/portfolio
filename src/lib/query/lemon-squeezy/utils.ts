import {
  activateLicense,
  validateLicense,
} from '@lemonsqueezy/lemonsqueezy.js';
import { Octokit } from 'octokit';

export async function getLicenseKey(params: { licenseKey: string }) {
  const { licenseKey } = params;

  const response = await validateLicense(licenseKey);
  const data = response.data;
  if (!data) {
    throw new Error(`Invalid license key`);
  }
  return data;
}

export async function activateLicenseKey(params: {
  licenseKey: string;
  instanceName: string;
}) {
  const { licenseKey, instanceName } = params;

  const response = await activateLicense(licenseKey, instanceName);
  const data = response.data;

  if (!data) {
    throw new Error(`Already activated license key`);
  }
  return data;
}

interface Params {
  owner: string;
  repo: string;
  username: string;
}

export function inviteMemberToRepository(params: Params) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_API_TOKEN,
  });

  return octokit.request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
    owner: params.owner,
    repo: params.repo,
    username: params.username,
    permission: 'pull',
  });
}
