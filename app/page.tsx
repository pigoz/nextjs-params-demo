import {
  ServerSearchParams,
  URLSearchParamsFromServerSearchParams,
  structFromURLSearchParams,
} from "@/utils/url";

interface PageProps {
  searchParams: ServerSearchParams;
}

export default function Home(props: PageProps) {
  const params = URLSearchParamsFromServerSearchParams(props.searchParams);
  const struct = structFromURLSearchParams(params, { parseNumbers: true });
  return (
    <main>
      <pre>{JSON.stringify(struct, null, 2)}</pre>
    </main>
  );
}
