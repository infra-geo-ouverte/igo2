/**
 * Return a new object with an array of keys removed
 * @param obj Source object
 * @param keys Keys to remove
 * @returns A new object
 */
export function removeKeys(obj: Object, keys: string[]): Object {
  const newObj = Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((_obj, key) => {
      _obj[key] = obj[key];
      return _obj;
    }, {});

    return newObj;
}

/**
 * Return true if two object are equivalent.
 * Objects are considered equivalent if they have the same properties and
 * if all of their properties (first-level only) share the same value.
 * @param obj1 First object
 * @param obj2 Second object
 * @returns Whether two objects arer equivalent
 */
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
