import {
  ServerSearchParams,
  URLSearchParamsFromServerSearchParams,
  parse,
} from "@/utils/query-string";

interface PageProps {
  searchParams: ServerSearchParams;
}

export default function Home(props: PageProps) {
  const params = URLSearchParamsFromServerSearchParams(props.searchParams);
  const struct = parse(params, { parseNumbers: true });
  return (
    <main>
      <pre>{JSON.stringify(struct, null, 2)}</pre>
    </main>
  );
}
