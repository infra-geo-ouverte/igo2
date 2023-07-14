
import { readdir } from 'fs/promises';
import { copyFile } from '../src/utils/file-system.utils';
import path from 'path';

const srcPath = 'node_modules/@igo2/core/locale';
const distPath = 'src/locale/libs_locale';


(async () => {

  await copyLocales();
})();

async function copyLocales(): Promise<void> {

  const files = await readdir(srcPath);
  const localeFiles = files.filter((filePath) =>
    !filePath.includes('.core.')
  );
  for (const localeFile of localeFiles) {
    const input = path.join(srcPath, localeFile);
    const output = path.join(distPath, localeFile);
    await copyFile(input, output);
  }
}