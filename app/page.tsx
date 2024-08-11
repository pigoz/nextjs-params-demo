"use client";

import { structFromURLSearchParams } from "@/utils/url";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const params = useSearchParams();
  const struct = structFromURLSearchParams(params, { parseNumbers: true });
  return (
    <main>
      <pre>{JSON.stringify(struct, null, 2)}</pre>
    </main>
  );
}
