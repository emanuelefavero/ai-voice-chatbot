export type Result<T, E = Error> =
  | { ok: true; data: T }
  | { ok: false; error: E }

export function ok<T>(data: T): Result<T, never> {
  return { ok: true, data }
}

export function err<E = Error>(error: E): Result<never, E> {
  return { ok: false, error }
}

export function unwrapResult<T, E = Error>(result: Result<T, E>): T {
  if (result.ok) {
    return result.data
  }

  throw result.error
}

export function match<T, E, R>(
  result: Result<T, E>,
  handlers: {
    ok: (data: T) => R
    err: (error: E) => R
  },
): R {
  return result.ok ? handlers.ok(result.data) : handlers.err(result.error)
}
