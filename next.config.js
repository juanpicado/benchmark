/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = "";
let basePath = "/";
if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const nextConfig = isGithubActions
  ? {
      reactStrictMode: true,
      swcMinify: true,
      assetPrefix,
      basePath,
    }
  : {
      reactStrictMode: true,
      swcMinify: true,
    };

module.exports = nextConfig;
