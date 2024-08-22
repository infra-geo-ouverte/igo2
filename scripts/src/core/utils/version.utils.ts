import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

import { resolveRoot } from '../../config/paths';
import * as log from '../../utils/log';

export async function setVersionFile(version: string) {
  const filePath = resolveRoot('src/environments/version.ts');

  let body = readFileSync(filePath, 'utf-8');
  body = body.replace(/app: '[A-Za-z0-9\.\-]+'/g, `app: '${version}'`);
  body = body.replace(
    /releaseDateApp: [0-9]+/g,
    `releaseDateApp: ${Date.now()}`
  );

  await writeFile(filePath, body, { flag: 'w' });
  log.success('The version file has been written');
}
