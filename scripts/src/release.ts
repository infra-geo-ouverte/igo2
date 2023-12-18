import { setVersionFile } from './core/utils/version.utils';
import { writeFile2 } from './utils/file-system.utils';
import * as log from './utils/log';
import { getDuration } from './utils/performance.utils';

const baseCmdName = 'Application release';

log.startMsg(baseCmdName);
(async () => {
  const startTime = performance.now();
  try {
    const [_nodePath, _scriptPath, argVersion, type] = process.argv;
    const version = argVersion ?? process.env.npm_new_version;

    if (!version) {
      throw new Error('No version detected');
    }

    log.info('Create the version.ts file');
    await setVersionFile(version);

    await deployGithubPage(version);

    log.success(`Release version ${version}`);

    const duration = getDuration(startTime);
    log.info(`${baseCmdName} excuted in ${duration}.`);
  } catch (err: any) {
    log.error(`The release failed with: ${err?.message}`);
    process.exit(1);
  }
})();

async function deployGithubPage(version: string): Promise<void> {
  const startTime = performance.now();
  const { $ } = await import('execa');
  const $$ = $({ stdio: 'inherit' });

  log.info('Build the app for Github');
  await $$`npm run build.github`;
  await writeFile2(
    'dist/ghpages/_config.yml',
    "include: ['_default.json', '_contexts.json', '_base.json']",
    false
  );

  await $$`npx ngh --dir=dist/ghpages --no-silent=false --message=${version}`;

  const duration = getDuration(startTime);
  log.success(
    `Deploy the app v${version} on Github Page, excuted in ${duration}.`
  );
}
