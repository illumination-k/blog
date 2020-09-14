const { execSync } = require("child_process");

module.exports = getGitHistory;

function getGitHistory(mdfilePath) {
  const cmd = `git --no-pager log --no-color --pretty=format:"%ad"`;
  const output = execSync(`${cmd} ${mdfilePath}`, {
    cwd: process.cwd(),
  }).toString();

  const historyArray = output.split("\n");
  const update = `${historyArray[0]}`;
  const published = `${historyArray.slice(-1)[0]}`;
  return { update: update, published: published };
}
