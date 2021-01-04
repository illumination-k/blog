const { execSync } = require("child_process");

module.exports = getGitHistory;

function fill_nodate(date) {
  if (!date) {
    const now = new Date();
    const formatted_date = `${now.getFullYear()}/${
      now.getMonth() + 1
    }/${now.getDate()}`;
    return formatted_date;
  }

  return date;
}

function getGitHistory(mdfilePath) {
  const cmd = `git --no-pager log --no-color --pretty=format:"%ad"`;
  const output = execSync(`${cmd} ${mdfilePath}`, {
    cwd: process.cwd(),
  }).toString();

  const historyArray = output.split("\n");
  const update = fill_nodate(`${historyArray[0]}`);
  const published = fill_nodate(`${historyArray.slice(-1)[0]}`);
  return { update: update, published: published };
}
