import { PageProps, URLSearchParamsFromPageProps } from "@/utils/next";
import { parse } from "@/utils/query-string";

export default function Home(props: PageProps) {
  const params = URLSearchParamsFromPageProps(props);
  const struct = parse(params, { parseNumbers: true });
  return (
    <main>
      <pre>{JSON.stringify(struct, null, 2)}</pre>
    </main>
  );
}
