export function naturalCompare(a, b, direction = 'asc', nullFirst = false) {
  if (direction === 'desc') {
    b = [a, (a = b)][0];
  }

  if (a === undefined || a === null || a === '') {
    if (direction === 'desc') {
      return nullFirst ? -1 : 1;
    }
    return nullFirst ? 1 : -1;
  }
  if (b === undefined || b === null || b === '') {
    if (direction === 'desc') {
      return nullFirst ? 1 : -1;
    }
    return nullFirst ? -1 : 1;
  }

  const ax = [];
  const bx = [];
  a = '' + a;
  b = '' + b;

  a.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
    ax.push([$1 || Infinity, $2 || '']);
  });

  b.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
    bx.push([$1 || Infinity, $2 || '']);
  });

  while (ax.length && bx.length) {
    const an = ax.shift();
    const bn = bx.shift();
    const nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
    if (nn) {
      return nn;
    }
  }

  return ax.length - bx.length;
}
