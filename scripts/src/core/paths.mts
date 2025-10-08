import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { readFileContentSync } from '../utils/file-system.utils.mts';

export interface IPackageJson {
  name: string;
  version: string;
  exports: { [key: string]: string | { [key: string]: string } };
  dependencies: { [key: string]: string };
  peerDependencies: { [key: string]: string };
}

const ROOT_LEVEL = '../../../../';
const ROOT = join(fileURLToPath(import.meta.url), ROOT_LEVEL);

export const resolveRoot = (relativePath: string): string => {
  return resolve(ROOT, relativePath);
};

export const PATHS = {
  dist: resolveRoot('dist'),
  nodeModules: resolveRoot('node_modules'),
  root: ROOT,
  packageJson: resolveRoot('package.json')
};

export function getPackageJson(): IPackageJson {
  return readFileContentSync(PATHS.packageJson);
}
