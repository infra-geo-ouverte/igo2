import { $ } from 'execa';
import { readFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

import { resolveRoot } from './core/paths.mts';
import { executor } from './utils/executor.mts';
import * as log from './utils/log.mts';

executor('Update version', async () => {
  const [_nodePath, _scriptPath, version] = process.argv;
  if (!version) {
    return;
  }

  await updateVersionFile(version);

  // Regenerate the package-lock.json with the latest version
  await $({ stdio: 'inherit', shell: true })`npm i --package-lock-only`;
});

async function updateVersionFile(version: string): Promise<void> {
  const filePath = resolveRoot('src/environments/version.ts');

  let body = readFileSync(filePath, 'utf-8');
  body = body.replace(/app: '[A-Za-z0-9\.\-]+'/g, `app: '${version}'`);
  body = body.replace(
    /releaseDateApp: [0-9]+/g,
    `releaseDateApp: ${Date.now()}`
  );

  try {
    await writeFile(filePath, body, { flag: 'w' });
    log.success(`Update version ${version} to the 'version.ts' file`);
  } catch (error: any) {
    log.error(error);
    process.exit(1);
  }
}
