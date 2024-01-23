import { resolve } from 'path';

type FolderCaterogy = 'dist' | 'root' | 'src' | 'nodeModules';

type IPaths = Record<FolderCaterogy, string> & { [index: string]: string };

const ROOT_LEVEL = '../../../';
const ROOT = resolve(__dirname, ROOT_LEVEL);

export const resolveRoot = (relativePath: string): string => {
  return resolve(ROOT, relativePath);
};

export const PATHS: IPaths = {
  dist: resolveRoot('dist'),
  nodeModules: resolveRoot('node_modules'),
  src: resolveRoot('src'),
  root: ROOT
};

export const resolvePackage = (name: string, ...paths: string[]): string => {
  return resolve(PATHS.packages, name, ...paths);
};

export const resolveDist = (name: string): string => {
  return resolve(PATHS.dist, name);
};
