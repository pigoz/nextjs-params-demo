type SearchParams = Record<string, string | string[] | undefined>;

export type PageProps = {
  searchParams: SearchParams;
};

export function URLSearchParamsFromPageProps(
  props: PageProps,
): URLSearchParams {
  // converts { "foo": ["a", "b"] } to [["foo", "a"], ["foo", "b"]]
  const entries = Object.entries(props.searchParams).flatMap(([k, v]) =>
    ([] as string[]).concat(v ?? []).map((_) => [k, _]),
  );
  return new URLSearchParams(entries);
}
