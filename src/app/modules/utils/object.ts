export function removeKeys(obj: Object, remove: Array<string>): Object {
  const newObj = Object.keys(obj)
    .filter(key => !remove.includes(key))
    .reduce((_obj, key) => {
      _obj[key] = obj[key];
      return _obj;
    }, {});

    return newObj;
}

export function isEquivalent(obj1: Object, obj2: Object): boolean {
  if (obj1 === obj2) {
    return true;
  }

  const obj1Props = Object.getOwnPropertyNames(obj1);
  const obj2Props = Object.getOwnPropertyNames(obj2);
  if (obj1Props.length !== obj2Props.length) {
      return false;
  }

  for (let i = 0; i < obj1Props.length; i++) {
      const prop = obj1Props[i];
      if (obj1[prop] !== obj2[prop]) {
        return false;
      }
  }

  return true;
}
