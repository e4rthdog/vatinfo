const { gitDescribe, gitDescribeSync } = require("git-describe");

// Target working directory

const gitInfo = gitDescribeSync({
  customArguments: [],
  dirtyMark: " ",
});
console.log(`export const versionObj= { version:'${gitInfo.raw}'};`);
