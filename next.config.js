require("dotenv").config();

module.exports = {
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,

    // GITHUB_CLIENT_SECRET is server-side only,
    // SIGNING_KEY is server-side only,

    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
  // ...
};
