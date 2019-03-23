export function max<T>(
  source: Iterable<T>,
  compareFn: (element1: T, element2: T) => number,
): T | undefined {
  let result: T | undefined = undefined;

  for (const element of source) {
    if (result === undefined || compareFn(element, result) > 0) {
      result = element;
    }
  }

  return result;
}
