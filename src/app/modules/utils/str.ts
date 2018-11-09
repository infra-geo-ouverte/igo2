/**
* Replace all occurence of ${property} with the corresponding value as defined
* in the properties Object.
*
* Note: This is a simple implementation but it could be improved
*   by not iterating all the properties, only those found in a prior lookup
*/
export function substituteProperties(base: string, properties: Object) {
  let out = base;
  Object.entries(properties).forEach(([key, value]) => {
    out = out.replace('${' + key + '}', String(value));
  });
  return out;
}
