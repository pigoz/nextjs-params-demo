import { PageProps, URLSearchParamsFromPageProps } from "@/utils/next";
import { parseUnsafe, parseParamUnsafe } from "@/utils/query-string";
import * as S from "@effect/schema/Schema";

const SearchParams = S.struct({
  bounds: S.tuple(
    S.NumberFromString,
    S.NumberFromString,
    S.NumberFromString,
    S.NumberFromString,
  ),
  foo: S.array(S.string),
  a: S.NumberFromString,
  b: S.string,
});

export default function Home(props: PageProps) {
  const params = URLSearchParamsFromPageProps(props);
  const struct = parseUnsafe(params, SearchParams);
  const b = parseParamUnsafe(params, "b", S.string);

  return (
    <main>
      <p>parseUnsafe</p>
      <pre>{JSON.stringify(struct, null, 2)}</pre>

      <p>parseParamUnsafe</p>
      <pre>{JSON.stringify(b, null, 2)}</pre>
    </main>
  );
}
