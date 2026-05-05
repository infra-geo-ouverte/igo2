/**
 * Source: https://github.com/ng-packagr/ng-packagr/blob/ee4fd635a626e1ee2266b05cb572002bb09b4849/src/lib/utils/log.ts
 */
export const error = (err: string | Error) => {
  if (err instanceof Error) {
    console.error('ERROR: ' + err.message);

    if (process.env.DEBUG) {
      console.error(err.stack ?? '' + '\n');
    }
  } else {
    console.error(err);
  }
};

export const warn = (msg: string) => {
  console.warn('WARNING: ' + msg);
};

export const success = (msg: string) => {
  console.log(msg);
};

export const info = (msg: string) => {
  console.log(msg);
};

export const msg = (msg: string) => {
  console.log(msg);
};

export const debug = (msg: string) => {
  if (process.env.DEBUG) {
    console.log(`[debug] ${msg}`);
  }
};

export const startMsg = (message: string) => {
  msg(
    '\n------------------------------------------------------------------------------'
  );
  msg(message);
  msg(
    '------------------------------------------------------------------------------'
  );
};
