import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  rmSync,
  symlinkSync
} from 'fs';
import { resolve } from 'path';

/**
 * link-lib.mts — Shared dependency symlinker for local igo2-lib development
 *
 * WHY THIS SCRIPT EXISTS
 * ──────────────────────
 * When developing igo2 against local igo2-lib packages, the Angular compiler
 * follows package symlinks into a separate project tree. Each tree has its own
 * node_modules, so
 * packages like @angular/core exist in BOTH:
 *
 *   igo2/node_modules/@angular/core      ← used by the app
 *   igo2-lib/node_modules/@angular/core  ← used by the lib source
 *
 * Angular identifies classes/directives by object identity. If the same class
 * is loaded twice from two different physical paths, Angular treats them as
 * different types — causing errors like:
 *   NG3004: Unable to import directive (symbol not exported from expected path)
 *   TS2345: Argument of type 'InputSignal' is not assignable to 'Signal'
 *
 * This script links igo2/node_modules/@igo2 packages to igo2-lib/packages and
 * links shared dependencies in igo2-lib/node_modules back to igo2/node_modules.
 * The app therefore compiles library TypeScript source while both trees use
 * the same physical dependency files.
 *
 * HOW TO USE
 * ──────────
 * Run once before starting the dev server (npm run link.start does both):
 *
 *   npm run link        # symlink only
 *   npm run link.start  # symlink + ng serve --configuration development-link
 *
 * Re-run after any `npm install` in igo2-lib (which would overwrite symlinks).
 *
 * WINDOWS COMPATIBILITY
 * ─────────────────────
 * On Windows, directory symlinks require Developer Mode or admin rights.
 * This script uses "junction" links on Windows, which do NOT require
 * elevated privileges and work the same way for this purpose.
 */

const appRoot = resolve(import.meta.dirname, '..', '..');
const libRoot = resolve(appRoot, '..', 'igo2-lib');

function removeIfExists(path: string) {
  try {
    lstatSync(path);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return;
    }
    throw error;
  }
  rmSync(path, { recursive: true, force: true });
}

function linkDir(targetPath: string, linkPath: string) {
  removeIfExists(linkPath);
  const type = process.platform === 'win32' ? 'junction' : 'dir';
  symlinkSync(targetPath, linkPath, type);
}

const sharedPackages = [
  '@angular/animations',
  '@angular/cdk',
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/material',
  '@angular/platform-browser',
  '@angular/router',
  'rxjs',
  'tslib',
  'ol',
  'proj4',
  '@ngx-translate/core',
  '@ngx-translate/http-loader'
];

if (!existsSync(resolve(libRoot, 'node_modules'))) {
  console.error(
    `ERROR: ${libRoot}/node_modules does not exist. Run "npm install" in igo2-lib first.`
  );
  process.exit(1);
}

const libTranslateScope = resolve(libRoot, 'node_modules', '@ngx-translate');
try {
  if (lstatSync(libTranslateScope).isSymbolicLink()) {
    rmSync(libTranslateScope, { force: true });
    mkdirSync(libTranslateScope, { recursive: true });
  }
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
    throw error;
  }
  mkdirSync(libTranslateScope, { recursive: true });
}

for (const pkg of sharedPackages) {
  const appPkg = resolve(appRoot, 'node_modules', pkg);
  const libPkg = resolve(libRoot, 'node_modules', pkg);

  if (!existsSync(appPkg)) {
    console.warn(`SKIP: ${pkg} not found in app node_modules`);
    continue;
  }

  // Replace whatever is there so both trees resolve the exact same files.
  linkDir(appPkg, libPkg);
  console.log(`LINKED: ${pkg}`);
}

console.log('\nDone. Shared dependencies now resolve to igo2/node_modules.');

const localPackagesRoot = resolve(libRoot, 'packages');
const appIgoRoot = resolve(appRoot, 'node_modules', '@igo2');
const localPackages = readdirSync(localPackagesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const pkg of localPackages) {
  const appPkg = resolve(appIgoRoot, pkg);
  const libPkg = resolve(localPackagesRoot, pkg);
  linkDir(libPkg, appPkg);
  console.log(`PACKAGE LINKED: @igo2/${pkg} → igo2-lib/packages/${pkg}`);
}

console.log(
  '\nApp TypeScript and Sass now resolve @igo2/* from igo2-lib/packages/*.'
);
