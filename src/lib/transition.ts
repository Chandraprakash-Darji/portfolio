export const postTransitionName = (title: string) =>
  `post-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
