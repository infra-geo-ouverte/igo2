import { existsSync } from 'fs';
import {
  copyFile as fsCopyFile,
  mkdir,
  readFile,
  writeFile
} from 'fs/promises';
import { normalize, sep } from 'path';

const BUFFER_ENCODING: BufferEncoding = 'utf-8';

export async function readFileContent<T>(path: string): Promise<T> {
  const body = await readFile(path, BUFFER_ENCODING);
  return JSON.parse(body) as T;
}

export async function createFile(
  fileName: string,
  dest: string,
  body: string
): Promise<void> {
  const path = `${dest}/${fileName}`;
  try {
    await writeFile(path, body, BUFFER_ENCODING);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await createFolderRecursively(dest);
      await writeFile(path, body, BUFFER_ENCODING);
    }
  }
}

export async function copyFile(src: string, dest: string): Promise<void> {
  try {
    await fsCopyFile(src, dest);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await createPreviousFolder(dest);
      await fsCopyFile(src, dest);
    }
  }
}

export async function createFolderRecursively(dest: string): Promise<void> {
  try {
    await mkdir(dest);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await createPreviousFolder(dest);
      await createFolderRecursively(dest);
    }
  }
}

async function createPreviousFolder(dest: string): Promise<void> {
  const folders = normalize(dest).split(sep);
  folders.pop();
  await createFolderRecursively(folders.join(sep));
}

export function pathExist(path: string): boolean {
  return existsSync(path);
}
