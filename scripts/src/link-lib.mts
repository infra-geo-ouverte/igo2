import { existsSync, lstatSync, rmSync, symlinkSync } from 'fs';
import { resolve } from 'path';

/**
 * link-lib.mts — Shared dependency symlinker for local igo2-lib development
 *
 * WHY THIS SCRIPT EXISTS
 * ──────────────────────
 * When developing igo2 against the local source of igo2-lib (using TypeScript
 * path mappings in tsconfig.link.json), the Angular compiler compiles files
 * from two separate project trees. Each tree has its own node_modules, so
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
 * This script replaces the packages in igo2-lib/node_modules with symlinks
 * that point to igo2/node_modules, so both trees resolve to the same
 * physical files.
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
  '@ngx-translate'
];

if (!existsSync(resolve(libRoot, 'node_modules'))) {
  console.error(
    `ERROR: ${libRoot}/node_modules does not exist. Run "npm install" in igo2-lib first.`
  );
  process.exit(1);
}

for (const pkg of sharedPackages) {
  const appPkg = resolve(appRoot, 'node_modules', pkg);
  const libPkg = resolve(libRoot, 'node_modules', pkg);

  if (!existsSync(appPkg)) {
    console.warn(`SKIP: ${pkg} not found in app node_modules`);
    continue;
  }

  // Remove existing (directory or symlink)
  if (existsSync(libPkg) || lstatSync(libPkg).isSymbolicLink?.()) {
    rmSync(libPkg, { recursive: true, force: true });
  }

  // Create symlink (junction on Windows for cross-platform compat)
  const type = process.platform === 'win32' ? 'junction' : 'dir';
  symlinkSync(appPkg, libPkg, type);
  console.log(`LINKED: ${pkg}`);
}

console.log('\nDone. Shared dependencies now resolve to igo2/node_modules.');
