export function removeKeys(obj: Object, remove: Array<string>): Object {
  const newObj = Object.keys(obj)
    .filter(key =>remove.includes(key))
    .reduce((_obj, key) => {
      _obj[key] = obj[key];
      return _obj;
    }, {});
  
    return newObj;
}