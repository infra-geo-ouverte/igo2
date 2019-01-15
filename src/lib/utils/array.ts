/**
 * This function return the differing items of two arrays.
 * The comparison is two-ways.
 * @param array1 First array
 * @param array2 Second array
 * @returns An array of differing items
 */
export function arrayDiff(array1: any[], array2: any[]): any[] {
  return array1.filter((v1: any) => !array2.includes(v1))
    .concat(array2.filter((v2: any) => !array1.includes(v2)));
}

/**
 * Returns true of two arrays are equalt. Two arrays are
 * considered equal if they contain the same items, in whatever order.
 * @param array1 First array
 * @param array2 Second array
 * @returns Whether the two arrays are equal
 */
export function arrayEqual(array1: any[], array2: any[]): boolean {
  return arrayDiff(array1, array2).length === 0;
}
