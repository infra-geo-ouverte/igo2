import { setVersionFile } from './core/utils/version.utils';
import * as log from './utils/log';
import { getDuration } from './utils/performance.utils';

const baseCmdName = 'Application release';

log.startMsg(baseCmdName);
(async () => {
  const startTime = performance.now();
  try {
    const [_nodePath, _scriptPath, argVersion] = process.argv;
    const version = argVersion ?? process.env.npm_new_version;

    if (!version) {
      throw new Error('No version detected');
    }

    log.info('Create the version.ts file');
    await setVersionFile(version);

    log.success(`Release version ${version}`);

    const duration = getDuration(startTime);
    log.info(`${baseCmdName} excuted in ${duration}.`);
  } catch (err: any) {
    log.error(`The release failed with: ${err?.message}`);
    process.exit(1);
  }
})();
