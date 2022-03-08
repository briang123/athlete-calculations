import { execSync } from 'child_process';
import semver from 'semver';
import fs from 'fs';

function getPackageJSON() {
  const packageJSON = fs.readFileSync('./package.json', 'utf-8');
  return JSON.parse(packageJSON);
}

function setPackageJSONVersions(originalVersion, version) {
  packageJSON.version = originalVersion;
  packageJSON.developmentVersion = version;
  fs.writeFileSync('package.json', JSON.stringify(packageJSON, null, 2));
}

const isDev = process.env.NODE_ENV === 'development';
const packageJSON = getPackageJSON();
const originalVersion = `${packageJSON.version}`;
const version = semver.inc(
  isDev ? packageJSON.developmentVersion : packageJSON.version,
  'minor',
);

const force = isDev ? '--force' : '';

const registry = isDev ? '--registry http://localhost:4873' : '';

try {
  execSync(
    `npm version ${version} --allow-same-version ${registry} && npm publish --access public ${force} ${registry}`,
  );
} catch (exception) {
  setPackageJSONVersions(originalVersion, version);
}

if (isDev) {
  setPackageJSONVersions(originalVersion, version);
}
