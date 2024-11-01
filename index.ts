type KeyedFunction<K extends string, F extends Function> = F & { key: K }

export const synk = <K extends string, C, R>(key: K, fn: (ctx: C) => R): KeyedFunction<K, (ctx: C) => R> =>
  Object.assign(fn, { key })

export const asynk = <K extends string, C, R>(
  key: K,
  fn: (ctx: C) => Promise<R>
): KeyedFunction<K, (ctx: C) => Promise<R>> => Object.assign(fn, { key })

export function klubok<K1 extends string, C extends object, R1>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>
): (ctx: C & { [k in K1]?: R1 }, only?: Set<K1>) => Promise<C & { [k in K1]: R1 }>
export function klubok<K1 extends string, K2 extends string, C extends object, R1, R2>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: C & { [k in K1]: R1 }) => Promise<R2> | R2>
): (
  ctx: C & { [k in K1]?: R1 } & { [k in K2]?: R2 },
  only?: Set<K1 | K2>
) => Promise<C & { [k in K1]: R1 } & { [k in K2]: R2 }>
export function klubok(...fns: KeyedFunction<string, Function>[]) {
  return (rootCtx = {}, only = new Set<string>()) =>
    fns.reduce(
      (acc, fn) =>
        acc.then(ctx =>
          Reflect.has(ctx, fn.key) || (only.size && !only.has(fn.key))
            ? ctx
            : Promise.resolve(fn(ctx)).then(resp => ({ ...ctx, [fn.key]: resp }))
        ),
      Promise.resolve(rootCtx)
    )
}
