const runCommand = require('@lerna/run');

// eslint-disable-next-line prefer-const
let [key, scope] = process.argv.slice(2);
if (key !== '--scope') {
  scope = process.env.npm_config_scope;
}

runCommand({
  includeDependencies: true,
  scope,
  sort: true,
  script: 'build',
  stream: true,
});
