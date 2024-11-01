type KeyedFunction<K extends string, F extends Function> = F & { key: K }

export const pure = <K extends string, C, R>(key: K, fn: (ctx: C) => R): KeyedFunction<K, (ctx: C) => R> =>
  Object.assign(fn, { key })

export const eff = <K extends string, C, R>(
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
export function klubok<K1 extends string, K2 extends string, K3 extends string, C extends object, R1, R2, R3>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: C & { [k in K1]: R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<K3, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 }) => Promise<R3> | R3>
): (
  ctx: C & { [k in K1]?: R1 } & { [k in K2]?: R2 } & { [k in K3]?: R3 },
  only?: Set<K1 | K2 | K3>
) => Promise<C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 }>
export function klubok<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  C extends object,
  R1,
  R2,
  R3,
  R4
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: C & { [k in K1]: R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<K3, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 }) => Promise<R3> | R3>,
  fn4: KeyedFunction<K4, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 }) => Promise<R4> | R4>
): (
  ctx: C & { [k in K1]?: R1 } & { [k in K2]?: R2 } & { [k in K3]?: R3 } & { [k in K4]?: R4 },
  only?: Set<K1 | K2 | K3 | K4>
) => Promise<C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 }>
export function klubok<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  C extends object,
  R1,
  R2,
  R3,
  R4,
  R5
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: C & { [k in K1]: R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<K3, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 }) => Promise<R3> | R3>,
  fn4: KeyedFunction<K4, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 }) => Promise<R4> | R4>,
  fn5: KeyedFunction<
    K5,
    (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 }) => Promise<R5> | R5
  >
): (
  ctx: C & { [k in K1]?: R1 } & { [k in K2]?: R2 } & { [k in K3]?: R3 } & { [k in K4]?: R4 } & { [k in K5]?: R5 },
  only?: Set<K1 | K2 | K3 | K4 | K5>
) => Promise<C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 }>
export function klubok<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  C extends object,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: C & { [k in K1]: R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<K3, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 }) => Promise<R3> | R3>,
  fn4: KeyedFunction<K4, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 }) => Promise<R4> | R4>,
  fn5: KeyedFunction<
    K5,
    (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 }
    ) => Promise<R6> | R6
  >
): (
  ctx: C & { [k in K1]?: R1 } & { [k in K2]?: R2 } & { [k in K3]?: R3 } & { [k in K4]?: R4 } & { [k in K5]?: R5 } & {
    [k in K6]?: R6
  },
  only?: Set<K1 | K2 | K3 | K4 | K5 | K6>
) => Promise<
  C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
    [k in K6]: R6
  }
>
export function klubok<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  C extends object,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: C & { [k in K1]: R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<K3, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 }) => Promise<R3> | R3>,
  fn4: KeyedFunction<K4, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 }) => Promise<R4> | R4>,
  fn5: KeyedFunction<
    K5,
    (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 }
    ) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
        [k in K6]: R6
      }
    ) => Promise<R7> | R7
  >
): (
  ctx: C & { [k in K1]?: R1 } & { [k in K2]?: R2 } & { [k in K3]?: R3 } & { [k in K4]?: R4 } & { [k in K5]?: R5 } & {
    [k in K6]?: R6
  } & {
    [k in K7]?: R7
  },
  only?: Set<K1 | K2 | K3 | K4 | K5 | K6 | K7>
) => Promise<
  C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
    [k in K6]: R6
  } & {
    [k in K7]: R7
  }
>
export function klubok<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  K8 extends string,
  C extends object,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: C & { [k in K1]: R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<K3, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 }) => Promise<R3> | R3>,
  fn4: KeyedFunction<K4, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 }) => Promise<R4> | R4>,
  fn5: KeyedFunction<
    K5,
    (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 }
    ) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
        [k in K6]: R6
      }
    ) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
        [k in K6]: R6
      } & {
        [k in K7]: R7
      }
    ) => Promise<R8> | R8
  >
): (
  ctx: C & { [k in K1]?: R1 } & { [k in K2]?: R2 } & { [k in K3]?: R3 } & { [k in K4]?: R4 } & { [k in K5]?: R5 } & {
    [k in K6]?: R6
  } & {
    [k in K7]?: R7
  } & {
    [k in K8]?: R8
  },
  only?: Set<K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8>
) => Promise<
  C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
    [k in K6]: R6
  } & {
    [k in K7]: R7
  } & {
    [k in K8]: R8
  }
>
export function klubok<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  K8 extends string,
  K9 extends string,
  C extends object,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: C & { [k in K1]: R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<K3, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 }) => Promise<R3> | R3>,
  fn4: KeyedFunction<K4, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 }) => Promise<R4> | R4>,
  fn5: KeyedFunction<
    K5,
    (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 }
    ) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
        [k in K6]: R6
      }
    ) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
        [k in K6]: R6
      } & {
        [k in K7]: R7
      }
    ) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
        [k in K6]: R6
      } & {
        [k in K7]: R7
      } & {
        [k in K8]: R8
      }
    ) => Promise<R9> | R9
  >
): (
  ctx: C & { [k in K1]?: R1 } & { [k in K2]?: R2 } & { [k in K3]?: R3 } & { [k in K4]?: R4 } & { [k in K5]?: R5 } & {
    [k in K6]?: R6
  } & {
    [k in K7]?: R7
  } & {
    [k in K8]?: R8
  } & {
    [k in K9]?: R9
  },
  only?: Set<K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9>
) => Promise<
  C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
    [k in K6]: R6
  } & {
    [k in K7]: R7
  } & {
    [k in K8]: R8
  } & {
    [k in K9]: R9
  }
>
export function klubok<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  K8 extends string,
  K9 extends string,
  K10 extends string,
  C extends object,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
  R10
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: C & { [k in K1]: R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<K3, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 }) => Promise<R3> | R3>,
  fn4: KeyedFunction<K4, (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 }) => Promise<R4> | R4>,
  fn5: KeyedFunction<
    K5,
    (ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 }
    ) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
        [k in K6]: R6
      }
    ) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
        [k in K6]: R6
      } & {
        [k in K7]: R7
      }
    ) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
        [k in K6]: R6
      } & {
        [k in K7]: R7
      } & {
        [k in K8]: R8
      }
    ) => Promise<R9> | R9
  >,
  fn10: KeyedFunction<
    K10,
    (
      ctx: C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
        [k in K6]: R6
      } & {
        [k in K7]: R7
      } & {
        [k in K8]: R8
      } & {
        [k in K9]: R9
      }
    ) => Promise<R10> | R10
  >
): (
  ctx: C & { [k in K1]?: R1 } & { [k in K2]?: R2 } & { [k in K3]?: R3 } & { [k in K4]?: R4 } & { [k in K5]?: R5 } & {
    [k in K6]?: R6
  } & {
    [k in K7]?: R7
  } & {
    [k in K8]?: R8
  } & {
    [k in K9]?: R9
  } & {
    [k in K10]?: R10
  },
  only?: Set<K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10>
) => Promise<
  C & { [k in K1]: R1 } & { [k in K2]: R2 } & { [k in K3]: R3 } & { [k in K4]: R4 } & { [k in K5]: R5 } & {
    [k in K6]: R6
  } & {
    [k in K7]: R7
  } & {
    [k in K8]: R8
  } & {
    [k in K9]: R9
  } & {
    [k in K10]: R10
  }
>
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
