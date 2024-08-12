export function parse(usp: URLSearchParams, options?: { parseNumbers?: true }) {
  type TypeOrArray<T> = T | T[];
  const params: Record<string, TypeOrArray<string | number | null>> = {};

  function NumberParser(value: string | null) {
    if (value === null) {
      return null;
    }
    const parsed = Number(value);
    return isNaN(parsed) ? value : parsed;
  }

  function IdentityParser(value: string | null) {
    return value;
  }

  const parser = options?.parseNumbers ? NumberParser : IdentityParser;

  for (const key of usp.keys()) {
    if (key.endsWith("[]")) {
      params[key.replace("[]", "")] = usp.getAll(key).map(parser);
    } else {
      params[key] = parser(usp.get(key));
    }
  }

  return params;
}
