// TODO: does Next export a type we can reuse?
export type ServerSearchParams = Record<string, string | string[]>;

export function URLSearchParamsFromServerSearchParams(
  params: ServerSearchParams,
): URLSearchParams {
  // converts { "foo": ["a", "b"] } to [["foo", "a"], ["foo", "b"]]
  const entries = Object.entries(params).flatMap(([k, v]) =>
    ([] as string[]).concat(v).map((_) => [k, _]),
  );
  return new URLSearchParams(entries);
}

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
