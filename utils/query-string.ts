import { Either } from "effect";
import * as S from "@effect/schema/Schema";
import { ParseError } from "@effect/schema/ParseResult";

/*
 * Parses a single parameter from an URLSearchParams object
 */
export function parseParam<K extends string, I, O>(
  usp: URLSearchParams,
  param: K,
  schema: S.Schema<I, O>,
): Either.Either<ParseError, O> {
  return parse(usp, S.struct({ [param]: schema })).pipe(
    Either.map((result) => result[param]),
  );
}

/*
 * Parses a single parameter from an URLSearchParams object.
 * Raises ParseError if the parsing fails.
 */
export function parseParamUnsafe<K extends string, I, O>(
  usp: URLSearchParams,
  param: K,
  schema: S.Schema<I, O>,
): O {
  return parseUnsafe(usp, S.struct({ [param]: schema }))[param];
}

/*
 * Parses multiple parameters from an URLSearchParams object.
 */
export function parse<I, O>(usp: URLSearchParams, schema: S.Schema<I, O>) {
  return S.parseEither(schema)(parse_(usp));
}

/*
 * Parses multiple parameters from an URLSearchParams object.
 * Raises ParseError if the parsing fails.
 */
export function parseUnsafe<I, O>(
  usp: URLSearchParams,
  schema: S.Schema<I, O>,
) {
  return S.parseSync(schema)(parse_(usp));
}

function parse_(usp: URLSearchParams) {
  const params: Record<string, string | null | string[]> = {};

  for (const key of usp.keys()) {
    if (key.endsWith("[]")) {
      params[key.replace("[]", "")] = usp.getAll(key);
    } else {
      params[key] = usp.get(key);
    }
  }

  return params;
}
