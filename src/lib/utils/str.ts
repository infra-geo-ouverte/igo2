/**
 * Replace all occurence of ${property} with the corresponding value
 * defined in the properties Object.
 *
 * Note: This is a simple implementation but it could be improved
 * by not iterating all the properties, only those found in a prior lookup.
 * @param base Base string with placeholders
 * @param properties Properties lookup
 * @returns A new string with placeholders replaced by a value. If a
 *  placeholder has no match in the properties lookup, it won't be replaced nor removed.
 */
export function substituteProperties(base: string, properties: {[key: string]: string | number}) {
  let out = base;
  Object.entries(properties).forEach(([key, value]) => {
    out = out.replace('${' + key + '}', String(value));
  });
  return out;
}
