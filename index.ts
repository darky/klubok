import { inspect } from 'node:util'

type KeyedFunction<K extends string, F extends Function> = F & {
  exitable: boolean
  key: K
  mutable: boolean
  onError: boolean
}

export const pure = <K extends string, C, R>(key: K, fn: (ctx: C) => R): KeyedFunction<K, (ctx: C) => R> =>
  Object.assign(fn, { exitable: false, key, mutable: false, onError: false })

export const eff = <K extends string, C, R>(
  key: K,
  fn: (ctx: C) => Promise<R>
): KeyedFunction<K, (ctx: C) => Promise<R>> =>
  Object.assign(fn, { exitable: false, key, mutable: false, onError: false })

export const mut = <K extends string, C, R>(fn: KeyedFunction<K, (ctx: C) => R>): KeyedFunction<K, (ctx: C) => R> =>
  Object.assign(fn, { mutable: true })

export const exitIf = <K extends string, C, R>(fn: KeyedFunction<K, (ctx: C) => R>): KeyedFunction<K, (ctx: C) => R> =>
  Object.assign(fn, { exitable: true })

export const onError = <K extends string, C, R>(key: K, fn: (ctx: C) => R): KeyedFunction<K, (ctx: C) => R> =>
  Object.assign(fn, { exitable: false, key, mutable: false, onError: true })

export function klubok<K1 extends string, C extends object, R1>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>
): (
  ctx: C,
  mock?: { [k in K1]?: R1 | ((ctx: C) => R1 | Promise<R1>) },
  only?: K1[]
) => Promise<{ [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }>
export function klubok<K1 extends string, K2 extends string, C extends object, R1, R2>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>
): (
  ctx: C,
  mock?: {
    [k in K1 | K2]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
  },
  only?: (K1 | K2)[]
) => Promise<{ [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }>
export function klubok<K1 extends string, K2 extends string, K3 extends string, C extends object, R1, R2, R3>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      :
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
  },
  only?: (K1 | K2 | K3)[]
) => Promise<{ [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }>
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
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      :
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
  },
  only?: (K1 | K2 | K3 | K4)[]
) => Promise<{
  [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : R4
}>
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
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4 | K5]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      :
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
  },
  only?: (K1 | K2 | K3 | K4 | K5)[]
) => Promise<{
  [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : R5
}>
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
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4 | K5 | K6]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      :
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6)[]
) => Promise<{
  [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : R6
}>
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
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4 | K5 | K6 | K7]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      :
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6 | K7)[]
) => Promise<{
  [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : R7
}>
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
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : R7
    }) => Promise<R8> | R8
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      : k extends K7
      ?
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
      :
          | R8
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : R7
            }) => R8 | Promise<R8>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8)[]
) => Promise<{
  [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : k extends K7
    ? R7
    : R8
}>
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
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : R7
    }) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : R8
    }) => Promise<R9> | R9
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      : k extends K7
      ?
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
      : k extends K8
      ?
          | R8
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : R7
            }) => R8 | Promise<R8>)
      :
          | R9
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : R8
            }) => R9 | Promise<R9>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9)[]
) => Promise<{
  [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : k extends K7
    ? R7
    : k extends K8
    ? R8
    : R9
}>
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
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : R7
    }) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : R8
    }) => Promise<R9> | R9
  >,
  fn10: KeyedFunction<
    K10,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : R9
    }) => Promise<R10> | R10
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      : k extends K7
      ?
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
      : k extends K8
      ?
          | R8
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : R7
            }) => R8 | Promise<R8>)
      : k extends K9
      ?
          | R9
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : R8
            }) => R9 | Promise<R9>)
      :
          | R10
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : R9
            }) => R10 | Promise<R10>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10)[]
) => Promise<{
  [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : k extends K7
    ? R7
    : k extends K8
    ? R8
    : k extends K9
    ? R9
    : R10
}>
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
  K11 extends string,
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
  R10,
  R11
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : R7
    }) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : R8
    }) => Promise<R9> | R9
  >,
  fn10: KeyedFunction<
    K10,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : R9
    }) => Promise<R10> | R10
  >,
  fn11: KeyedFunction<
    K11,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : R10
    }) => Promise<R11> | R11
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      : k extends K7
      ?
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
      : k extends K8
      ?
          | R8
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : R7
            }) => R8 | Promise<R8>)
      : k extends K9
      ?
          | R9
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : R8
            }) => R9 | Promise<R9>)
      : k extends K10
      ?
          | R10
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : R9
            }) => R10 | Promise<R10>)
      :
          | R11
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : R10
            }) => R11 | Promise<R11>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11)[]
) => Promise<{
  [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : k extends K7
    ? R7
    : k extends K8
    ? R8
    : k extends K9
    ? R9
    : k extends K10
    ? R10
    : R11
}>
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
  K11 extends string,
  K12 extends string,
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
  R10,
  R11,
  R12
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : R7
    }) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : R8
    }) => Promise<R9> | R9
  >,
  fn10: KeyedFunction<
    K10,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : R9
    }) => Promise<R10> | R10
  >,
  fn11: KeyedFunction<
    K11,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : R10
    }) => Promise<R11> | R11
  >,
  fn12: KeyedFunction<
    K12,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : R11
    }) => Promise<R12> | R12
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      : k extends K7
      ?
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
      : k extends K8
      ?
          | R8
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : R7
            }) => R8 | Promise<R8>)
      : k extends K9
      ?
          | R9
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : R8
            }) => R9 | Promise<R9>)
      : k extends K10
      ?
          | R10
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : R9
            }) => R10 | Promise<R10>)
      : k extends K11
      ?
          | R11
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : R10
            }) => R11 | Promise<R11>)
      :
          | R12
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : R11
            }) => R12 | Promise<R12>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12)[]
) => Promise<{
  [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : k extends K7
    ? R7
    : k extends K8
    ? R8
    : k extends K9
    ? R9
    : k extends K10
    ? R10
    : k extends K11
    ? R11
    : R12
}>
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
  K11 extends string,
  K12 extends string,
  K13 extends string,
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
  R10,
  R11,
  R12,
  R13
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : R7
    }) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : R8
    }) => Promise<R9> | R9
  >,
  fn10: KeyedFunction<
    K10,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : R9
    }) => Promise<R10> | R10
  >,
  fn11: KeyedFunction<
    K11,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : R10
    }) => Promise<R11> | R11
  >,
  fn12: KeyedFunction<
    K12,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : R11
    }) => Promise<R12> | R12
  >,
  fn13: KeyedFunction<
    K13,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : R12
    }) => Promise<R13> | R13
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      : k extends K7
      ?
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
      : k extends K8
      ?
          | R8
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : R7
            }) => R8 | Promise<R8>)
      : k extends K9
      ?
          | R9
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : R8
            }) => R9 | Promise<R9>)
      : k extends K10
      ?
          | R10
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : R9
            }) => R10 | Promise<R10>)
      : k extends K11
      ?
          | R11
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : R10
            }) => R11 | Promise<R11>)
      : k extends K12
      ?
          | R12
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : R11
            }) => R12 | Promise<R12>)
      :
          | R13
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : R12
            }) => R13 | Promise<R13>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13)[]
) => Promise<{
  [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : k extends K7
    ? R7
    : k extends K8
    ? R8
    : k extends K9
    ? R9
    : k extends K10
    ? R10
    : k extends K11
    ? R11
    : k extends K12
    ? R12
    : R13
}>
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
  K11 extends string,
  K12 extends string,
  K13 extends string,
  K14 extends string,
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
  R10,
  R11,
  R12,
  R13,
  R14
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : R7
    }) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : R8
    }) => Promise<R9> | R9
  >,
  fn10: KeyedFunction<
    K10,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : R9
    }) => Promise<R10> | R10
  >,
  fn11: KeyedFunction<
    K11,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : R10
    }) => Promise<R11> | R11
  >,
  fn12: KeyedFunction<
    K12,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : R11
    }) => Promise<R12> | R12
  >,
  fn13: KeyedFunction<
    K13,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : R12
    }) => Promise<R13> | R13
  >,
  fn14: KeyedFunction<
    K14,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : R13
    }) => Promise<R14> | R14
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      : k extends K7
      ?
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
      : k extends K8
      ?
          | R8
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : R7
            }) => R8 | Promise<R8>)
      : k extends K9
      ?
          | R9
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : R8
            }) => R9 | Promise<R9>)
      : k extends K10
      ?
          | R10
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : R9
            }) => R10 | Promise<R10>)
      : k extends K11
      ?
          | R11
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : R10
            }) => R11 | Promise<R11>)
      : k extends K12
      ?
          | R12
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : R11
            }) => R12 | Promise<R12>)
      : k extends K13
      ?
          | R13
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : R12
            }) => R13 | Promise<R13>)
      :
          | R14
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : R13
            }) => R14 | Promise<R14>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14)[]
) => Promise<{
  [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : k extends K7
    ? R7
    : k extends K8
    ? R8
    : k extends K9
    ? R9
    : k extends K10
    ? R10
    : k extends K11
    ? R11
    : k extends K12
    ? R12
    : k extends K13
    ? R13
    : R14
}>
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
  K11 extends string,
  K12 extends string,
  K13 extends string,
  K14 extends string,
  K15 extends string,
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
  R10,
  R11,
  R12,
  R13,
  R14,
  R15
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : R7
    }) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : R8
    }) => Promise<R9> | R9
  >,
  fn10: KeyedFunction<
    K10,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : R9
    }) => Promise<R10> | R10
  >,
  fn11: KeyedFunction<
    K11,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : R10
    }) => Promise<R11> | R11
  >,
  fn12: KeyedFunction<
    K12,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : R11
    }) => Promise<R12> | R12
  >,
  fn13: KeyedFunction<
    K13,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : R12
    }) => Promise<R13> | R13
  >,
  fn14: KeyedFunction<
    K14,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : R13
    }) => Promise<R14> | R14
  >,
  fn15: KeyedFunction<
    K15,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : R14
    }) => Promise<R15> | R15
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      : k extends K7
      ?
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
      : k extends K8
      ?
          | R8
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : R7
            }) => R8 | Promise<R8>)
      : k extends K9
      ?
          | R9
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : R8
            }) => R9 | Promise<R9>)
      : k extends K10
      ?
          | R10
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : R9
            }) => R10 | Promise<R10>)
      : k extends K11
      ?
          | R11
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : R10
            }) => R11 | Promise<R11>)
      : k extends K12
      ?
          | R12
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : R11
            }) => R12 | Promise<R12>)
      : k extends K13
      ?
          | R13
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : R12
            }) => R13 | Promise<R13>)
      : k extends K14
      ?
          | R14
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : R13
            }) => R14 | Promise<R14>)
      :
          | R15
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : R14
            }) => R15 | Promise<R15>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15)[]
) => Promise<{
  [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15 | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : k extends K7
    ? R7
    : k extends K8
    ? R8
    : k extends K9
    ? R9
    : k extends K10
    ? R10
    : k extends K11
    ? R11
    : k extends K12
    ? R12
    : k extends K13
    ? R13
    : k extends K14
    ? R14
    : R15
}>
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
  K11 extends string,
  K12 extends string,
  K13 extends string,
  K14 extends string,
  K15 extends string,
  K16 extends string,
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
  R10,
  R11,
  R12,
  R13,
  R14,
  R15,
  R16
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : R7
    }) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : R8
    }) => Promise<R9> | R9
  >,
  fn10: KeyedFunction<
    K10,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : R9
    }) => Promise<R10> | R10
  >,
  fn11: KeyedFunction<
    K11,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : R10
    }) => Promise<R11> | R11
  >,
  fn12: KeyedFunction<
    K12,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : R11
    }) => Promise<R12> | R12
  >,
  fn13: KeyedFunction<
    K13,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : R12
    }) => Promise<R13> | R13
  >,
  fn14: KeyedFunction<
    K14,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : R13
    }) => Promise<R14> | R14
  >,
  fn15: KeyedFunction<
    K15,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : R14
    }) => Promise<R15> | R15
  >,
  fn16: KeyedFunction<
    K16,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : R15
    }) => Promise<R16> | R16
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15 | K16]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      : k extends K7
      ?
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
      : k extends K8
      ?
          | R8
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : R7
            }) => R8 | Promise<R8>)
      : k extends K9
      ?
          | R9
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : R8
            }) => R9 | Promise<R9>)
      : k extends K10
      ?
          | R10
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : R9
            }) => R10 | Promise<R10>)
      : k extends K11
      ?
          | R11
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : R10
            }) => R11 | Promise<R11>)
      : k extends K12
      ?
          | R12
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : R11
            }) => R12 | Promise<R12>)
      : k extends K13
      ?
          | R13
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : R12
            }) => R13 | Promise<R13>)
      : k extends K14
      ?
          | R14
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : R13
            }) => R14 | Promise<R14>)
      : k extends K15
      ?
          | R15
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : R14
            }) => R15 | Promise<R15>)
      :
          | R16
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : R15
            }) => R16 | Promise<R16>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15 | K16)[]
) => Promise<{
  [k in
    | K1
    | K2
    | K3
    | K4
    | K5
    | K6
    | K7
    | K8
    | K9
    | K10
    | K11
    | K12
    | K13
    | K14
    | K15
    | K16
    | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : k extends K7
    ? R7
    : k extends K8
    ? R8
    : k extends K9
    ? R9
    : k extends K10
    ? R10
    : k extends K11
    ? R11
    : k extends K12
    ? R12
    : k extends K13
    ? R13
    : k extends K14
    ? R14
    : k extends K15
    ? R15
    : R16
}>
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
  K11 extends string,
  K12 extends string,
  K13 extends string,
  K14 extends string,
  K15 extends string,
  K16 extends string,
  K17 extends string,
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
  R10,
  R11,
  R12,
  R13,
  R14,
  R15,
  R16,
  R17
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : R7
    }) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : R8
    }) => Promise<R9> | R9
  >,
  fn10: KeyedFunction<
    K10,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : R9
    }) => Promise<R10> | R10
  >,
  fn11: KeyedFunction<
    K11,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : R10
    }) => Promise<R11> | R11
  >,
  fn12: KeyedFunction<
    K12,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : R11
    }) => Promise<R12> | R12
  >,
  fn13: KeyedFunction<
    K13,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : R12
    }) => Promise<R13> | R13
  >,
  fn14: KeyedFunction<
    K14,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : R13
    }) => Promise<R14> | R14
  >,
  fn15: KeyedFunction<
    K15,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : R14
    }) => Promise<R15> | R15
  >,
  fn16: KeyedFunction<
    K16,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : R15
    }) => Promise<R16> | R16
  >,
  fn17: KeyedFunction<
    K17,
    (ctx: {
      [k in
        | K1
        | K2
        | K3
        | K4
        | K5
        | K6
        | K7
        | K8
        | K9
        | K10
        | K11
        | K12
        | K13
        | K14
        | K15
        | K16
        | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : k extends K15
        ? R15
        : R16
    }) => Promise<R17> | R17
  >
): (
  ctx: C,
  mock?: {
    [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15 | K16 | K17]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      : k extends K7
      ?
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
      : k extends K8
      ?
          | R8
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : R7
            }) => R8 | Promise<R8>)
      : k extends K9
      ?
          | R9
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : R8
            }) => R9 | Promise<R9>)
      : k extends K10
      ?
          | R10
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : R9
            }) => R10 | Promise<R10>)
      : k extends K11
      ?
          | R11
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : R10
            }) => R11 | Promise<R11>)
      : k extends K12
      ?
          | R12
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : R11
            }) => R12 | Promise<R12>)
      : k extends K13
      ?
          | R13
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : R12
            }) => R13 | Promise<R13>)
      : k extends K14
      ?
          | R14
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : R13
            }) => R14 | Promise<R14>)
      : k extends K15
      ?
          | R15
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : R14
            }) => R15 | Promise<R15>)
      : k extends K16
      ?
          | R16
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : R15
            }) => R16 | Promise<R16>)
      :
          | R17
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | K16
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : k extends K15
                ? R15
                : R16
            }) => R17 | Promise<R17>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15 | K16 | K17)[]
) => Promise<{
  [k in
    | K1
    | K2
    | K3
    | K4
    | K5
    | K6
    | K7
    | K8
    | K9
    | K10
    | K11
    | K12
    | K13
    | K14
    | K15
    | K16
    | K17
    | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : k extends K7
    ? R7
    : k extends K8
    ? R8
    : k extends K9
    ? R9
    : k extends K10
    ? R10
    : k extends K11
    ? R11
    : k extends K12
    ? R12
    : k extends K13
    ? R13
    : k extends K14
    ? R14
    : k extends K15
    ? R15
    : k extends K16
    ? R16
    : R17
}>
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
  K11 extends string,
  K12 extends string,
  K13 extends string,
  K14 extends string,
  K15 extends string,
  K16 extends string,
  K17 extends string,
  K18 extends string,
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
  R10,
  R11,
  R12,
  R13,
  R14,
  R15,
  R16,
  R17,
  R18
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : R7
    }) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : R8
    }) => Promise<R9> | R9
  >,
  fn10: KeyedFunction<
    K10,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : R9
    }) => Promise<R10> | R10
  >,
  fn11: KeyedFunction<
    K11,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : R10
    }) => Promise<R11> | R11
  >,
  fn12: KeyedFunction<
    K12,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : R11
    }) => Promise<R12> | R12
  >,
  fn13: KeyedFunction<
    K13,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : R12
    }) => Promise<R13> | R13
  >,
  fn14: KeyedFunction<
    K14,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : R13
    }) => Promise<R14> | R14
  >,
  fn15: KeyedFunction<
    K15,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : R14
    }) => Promise<R15> | R15
  >,
  fn16: KeyedFunction<
    K16,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : R15
    }) => Promise<R16> | R16
  >,
  fn17: KeyedFunction<
    K17,
    (ctx: {
      [k in
        | K1
        | K2
        | K3
        | K4
        | K5
        | K6
        | K7
        | K8
        | K9
        | K10
        | K11
        | K12
        | K13
        | K14
        | K15
        | K16
        | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : k extends K15
        ? R15
        : R16
    }) => Promise<R17> | R17
  >,
  fn18: KeyedFunction<
    K18,
    (ctx: {
      [k in
        | K1
        | K2
        | K3
        | K4
        | K5
        | K6
        | K7
        | K8
        | K9
        | K10
        | K11
        | K12
        | K13
        | K14
        | K15
        | K16
        | K17
        | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : k extends K15
        ? R15
        : k extends K16
        ? R16
        : R17
    }) => Promise<R18> | R18
  >
): (
  ctx: C,
  mock?: {
    [k in
      | K1
      | K2
      | K3
      | K4
      | K5
      | K6
      | K7
      | K8
      | K9
      | K10
      | K11
      | K12
      | K13
      | K14
      | K15
      | K16
      | K17
      | K18]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      : k extends K7
      ?
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
      : k extends K8
      ?
          | R8
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : R7
            }) => R8 | Promise<R8>)
      : k extends K9
      ?
          | R9
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : R8
            }) => R9 | Promise<R9>)
      : k extends K10
      ?
          | R10
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : R9
            }) => R10 | Promise<R10>)
      : k extends K11
      ?
          | R11
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : R10
            }) => R11 | Promise<R11>)
      : k extends K12
      ?
          | R12
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : R11
            }) => R12 | Promise<R12>)
      : k extends K13
      ?
          | R13
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : R12
            }) => R13 | Promise<R13>)
      : k extends K14
      ?
          | R14
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : R13
            }) => R14 | Promise<R14>)
      : k extends K15
      ?
          | R15
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : R14
            }) => R15 | Promise<R15>)
      : k extends K16
      ?
          | R16
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : R15
            }) => R16 | Promise<R16>)
      : k extends K17
      ?
          | R17
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | K16
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : k extends K15
                ? R15
                : R16
            }) => R17 | Promise<R17>)
      :
          | R18
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | K16
                | K17
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : k extends K15
                ? R15
                : k extends K16
                ? R16
                : R17
            }) => R18 | Promise<R18>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15 | K16 | K17 | K18)[]
) => Promise<{
  [k in
    | K1
    | K2
    | K3
    | K4
    | K5
    | K6
    | K7
    | K8
    | K9
    | K10
    | K11
    | K12
    | K13
    | K14
    | K15
    | K16
    | K17
    | K18
    | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : k extends K7
    ? R7
    : k extends K8
    ? R8
    : k extends K9
    ? R9
    : k extends K10
    ? R10
    : k extends K11
    ? R11
    : k extends K12
    ? R12
    : k extends K13
    ? R13
    : k extends K14
    ? R14
    : k extends K15
    ? R15
    : k extends K16
    ? R16
    : k extends K17
    ? R17
    : R18
}>
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
  K11 extends string,
  K12 extends string,
  K13 extends string,
  K14 extends string,
  K15 extends string,
  K16 extends string,
  K17 extends string,
  K18 extends string,
  K19 extends string,
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
  R10,
  R11,
  R12,
  R13,
  R14,
  R15,
  R16,
  R17,
  R18,
  R19
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : R7
    }) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : R8
    }) => Promise<R9> | R9
  >,
  fn10: KeyedFunction<
    K10,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : R9
    }) => Promise<R10> | R10
  >,
  fn11: KeyedFunction<
    K11,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : R10
    }) => Promise<R11> | R11
  >,
  fn12: KeyedFunction<
    K12,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : R11
    }) => Promise<R12> | R12
  >,
  fn13: KeyedFunction<
    K13,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : R12
    }) => Promise<R13> | R13
  >,
  fn14: KeyedFunction<
    K14,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : R13
    }) => Promise<R14> | R14
  >,
  fn15: KeyedFunction<
    K15,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : R14
    }) => Promise<R15> | R15
  >,
  fn16: KeyedFunction<
    K16,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : R15
    }) => Promise<R16> | R16
  >,
  fn17: KeyedFunction<
    K17,
    (ctx: {
      [k in
        | K1
        | K2
        | K3
        | K4
        | K5
        | K6
        | K7
        | K8
        | K9
        | K10
        | K11
        | K12
        | K13
        | K14
        | K15
        | K16
        | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : k extends K15
        ? R15
        : R16
    }) => Promise<R17> | R17
  >,
  fn18: KeyedFunction<
    K18,
    (ctx: {
      [k in
        | K1
        | K2
        | K3
        | K4
        | K5
        | K6
        | K7
        | K8
        | K9
        | K10
        | K11
        | K12
        | K13
        | K14
        | K15
        | K16
        | K17
        | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : k extends K15
        ? R15
        : k extends K16
        ? R16
        : R17
    }) => Promise<R18> | R18
  >,
  fn19: KeyedFunction<
    K19,
    (ctx: {
      [k in
        | K1
        | K2
        | K3
        | K4
        | K5
        | K6
        | K7
        | K8
        | K9
        | K10
        | K11
        | K12
        | K13
        | K14
        | K15
        | K16
        | K17
        | K18
        | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : k extends K15
        ? R15
        : k extends K16
        ? R16
        : k extends K17
        ? R17
        : R18
    }) => Promise<R19> | R19
  >
): (
  ctx: C,
  mock?: {
    [k in
      | K1
      | K2
      | K3
      | K4
      | K5
      | K6
      | K7
      | K8
      | K9
      | K10
      | K11
      | K12
      | K13
      | K14
      | K15
      | K16
      | K17
      | K18
      | K19]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      : k extends K7
      ?
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
      : k extends K8
      ?
          | R8
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : R7
            }) => R8 | Promise<R8>)
      : k extends K9
      ?
          | R9
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : R8
            }) => R9 | Promise<R9>)
      : k extends K10
      ?
          | R10
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : R9
            }) => R10 | Promise<R10>)
      : k extends K11
      ?
          | R11
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : R10
            }) => R11 | Promise<R11>)
      : k extends K12
      ?
          | R12
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : R11
            }) => R12 | Promise<R12>)
      : k extends K13
      ?
          | R13
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : R12
            }) => R13 | Promise<R13>)
      : k extends K14
      ?
          | R14
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : R13
            }) => R14 | Promise<R14>)
      : k extends K15
      ?
          | R15
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : R14
            }) => R15 | Promise<R15>)
      : k extends K16
      ?
          | R16
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : R15
            }) => R16 | Promise<R16>)
      : k extends K17
      ?
          | R17
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | K16
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : k extends K15
                ? R15
                : R16
            }) => R17 | Promise<R17>)
      : k extends K18
      ?
          | R18
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | K16
                | K17
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : k extends K15
                ? R15
                : k extends K16
                ? R16
                : R17
            }) => R18 | Promise<R18>)
      :
          | R19
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | K16
                | K17
                | K18
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : k extends K15
                ? R15
                : k extends K16
                ? R16
                : k extends K17
                ? R17
                : R18
            }) => R19 | Promise<R19>)
  },
  only?: (K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15 | K16 | K17 | K18 | K19)[]
) => Promise<{
  [k in
    | K1
    | K2
    | K3
    | K4
    | K5
    | K6
    | K7
    | K8
    | K9
    | K10
    | K11
    | K12
    | K13
    | K14
    | K15
    | K16
    | K17
    | K18
    | K19
    | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : k extends K7
    ? R7
    : k extends K8
    ? R8
    : k extends K9
    ? R9
    : k extends K10
    ? R10
    : k extends K11
    ? R11
    : k extends K12
    ? R12
    : k extends K13
    ? R13
    : k extends K14
    ? R14
    : k extends K15
    ? R15
    : k extends K16
    ? R16
    : k extends K17
    ? R17
    : k extends K18
    ? R18
    : R19
}>
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
  K11 extends string,
  K12 extends string,
  K13 extends string,
  K14 extends string,
  K15 extends string,
  K16 extends string,
  K17 extends string,
  K18 extends string,
  K19 extends string,
  K20 extends string,
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
  R10,
  R11,
  R12,
  R13,
  R14,
  R15,
  R16,
  R17,
  R18,
  R19,
  R20
>(
  fn1: KeyedFunction<K1, (ctx: C) => Promise<R1> | R1>,
  fn2: KeyedFunction<K2, (ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => Promise<R2> | R2>,
  fn3: KeyedFunction<
    K3,
    (ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => Promise<R3> | R3
  >,
  fn4: KeyedFunction<
    K4,
    (ctx: { [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3 }) =>
      | Promise<R4>
      | R4
  >,
  fn5: KeyedFunction<
    K5,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : R4
    }) => Promise<R5> | R5
  >,
  fn6: KeyedFunction<
    K6,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : R5
    }) => Promise<R6> | R6
  >,
  fn7: KeyedFunction<
    K7,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : R6
    }) => Promise<R7> | R7
  >,
  fn8: KeyedFunction<
    K8,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : R7
    }) => Promise<R8> | R8
  >,
  fn9: KeyedFunction<
    K9,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : R8
    }) => Promise<R9> | R9
  >,
  fn10: KeyedFunction<
    K10,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : R9
    }) => Promise<R10> | R10
  >,
  fn11: KeyedFunction<
    K11,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : R10
    }) => Promise<R11> | R11
  >,
  fn12: KeyedFunction<
    K12,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : R11
    }) => Promise<R12> | R12
  >,
  fn13: KeyedFunction<
    K13,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : R12
    }) => Promise<R13> | R13
  >,
  fn14: KeyedFunction<
    K14,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : R13
    }) => Promise<R14> | R14
  >,
  fn15: KeyedFunction<
    K15,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : R14
    }) => Promise<R15> | R15
  >,
  fn16: KeyedFunction<
    K16,
    (ctx: {
      [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15 | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : R15
    }) => Promise<R16> | R16
  >,
  fn17: KeyedFunction<
    K17,
    (ctx: {
      [k in
        | K1
        | K2
        | K3
        | K4
        | K5
        | K6
        | K7
        | K8
        | K9
        | K10
        | K11
        | K12
        | K13
        | K14
        | K15
        | K16
        | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : k extends K15
        ? R15
        : R16
    }) => Promise<R17> | R17
  >,
  fn18: KeyedFunction<
    K18,
    (ctx: {
      [k in
        | K1
        | K2
        | K3
        | K4
        | K5
        | K6
        | K7
        | K8
        | K9
        | K10
        | K11
        | K12
        | K13
        | K14
        | K15
        | K16
        | K17
        | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : k extends K15
        ? R15
        : k extends K16
        ? R16
        : R17
    }) => Promise<R18> | R18
  >,
  fn19: KeyedFunction<
    K19,
    (ctx: {
      [k in
        | K1
        | K2
        | K3
        | K4
        | K5
        | K6
        | K7
        | K8
        | K9
        | K10
        | K11
        | K12
        | K13
        | K14
        | K15
        | K16
        | K17
        | K18
        | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : k extends K15
        ? R15
        : k extends K16
        ? R16
        : k extends K17
        ? R17
        : R18
    }) => Promise<R19> | R19
  >,
  fn20: KeyedFunction<
    K20,
    (ctx: {
      [k in
        | K1
        | K2
        | K3
        | K4
        | K5
        | K6
        | K7
        | K8
        | K9
        | K10
        | K11
        | K12
        | K13
        | K14
        | K15
        | K16
        | K17
        | K18
        | K19
        | keyof C]: k extends keyof C
        ? C[k]
        : k extends K1
        ? R1
        : k extends K2
        ? R2
        : k extends K3
        ? R3
        : k extends K4
        ? R4
        : k extends K5
        ? R5
        : k extends K6
        ? R6
        : k extends K7
        ? R7
        : k extends K8
        ? R8
        : k extends K9
        ? R9
        : k extends K10
        ? R10
        : k extends K11
        ? R11
        : k extends K12
        ? R12
        : k extends K13
        ? R13
        : k extends K14
        ? R14
        : k extends K15
        ? R15
        : k extends K16
        ? R16
        : k extends K17
        ? R17
        : k extends K18
        ? R18
        : R19
    }) => Promise<R20> | R20
  >
): (
  ctx: C,
  mock?: {
    [k in
      | K1
      | K2
      | K3
      | K4
      | K5
      | K6
      | K7
      | K8
      | K9
      | K10
      | K11
      | K12
      | K13
      | K14
      | K15
      | K16
      | K17
      | K18
      | K19
      | K20]?: k extends K1
      ? R1 | ((ctx: C) => R1 | Promise<R1>)
      : k extends K2
      ? R2 | ((ctx: { [k in K1 | keyof C]: k extends keyof C ? C[k] : R1 }) => R2 | Promise<R2>)
      : k extends K3
      ?
          | R3
          | ((ctx: { [k in K1 | K2 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : R2 }) => R3 | Promise<R3>)
      : k extends K4
      ?
          | R4
          | ((ctx: {
              [k in K1 | K2 | K3 | keyof C]: k extends keyof C ? C[k] : k extends K1 ? R1 : k extends K2 ? R2 : R3
            }) => R4 | Promise<R4>)
      : k extends K5
      ?
          | R5
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : R4
            }) => R5 | Promise<R5>)
      : k extends K6
      ?
          | R6
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : R5
            }) => R6 | Promise<R6>)
      : k extends K7
      ?
          | R7
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : R6
            }) => R7 | Promise<R7>)
      : k extends K8
      ?
          | R8
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : R7
            }) => R8 | Promise<R8>)
      : k extends K9
      ?
          | R9
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : R8
            }) => R9 | Promise<R9>)
      : k extends K10
      ?
          | R10
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : R9
            }) => R10 | Promise<R10>)
      : k extends K11
      ?
          | R11
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : R10
            }) => R11 | Promise<R11>)
      : k extends K12
      ?
          | R12
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : R11
            }) => R12 | Promise<R12>)
      : k extends K13
      ?
          | R13
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : R12
            }) => R13 | Promise<R13>)
      : k extends K14
      ?
          | R14
          | ((ctx: {
              [k in K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : R13
            }) => R14 | Promise<R14>)
      : k extends K15
      ?
          | R15
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : R14
            }) => R15 | Promise<R15>)
      : k extends K16
      ?
          | R16
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : R15
            }) => R16 | Promise<R16>)
      : k extends K17
      ?
          | R17
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | K16
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : k extends K15
                ? R15
                : R16
            }) => R17 | Promise<R17>)
      : k extends K18
      ?
          | R18
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | K16
                | K17
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : k extends K15
                ? R15
                : k extends K16
                ? R16
                : R17
            }) => R18 | Promise<R18>)
      : k extends K19
      ?
          | R19
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | K16
                | K17
                | K18
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : k extends K15
                ? R15
                : k extends K16
                ? R16
                : k extends K17
                ? R17
                : R18
            }) => R19 | Promise<R19>)
      :
          | R20
          | ((ctx: {
              [k in
                | K1
                | K2
                | K3
                | K4
                | K5
                | K6
                | K7
                | K8
                | K9
                | K10
                | K11
                | K12
                | K13
                | K14
                | K15
                | K16
                | K17
                | K18
                | K19
                | keyof C]: k extends keyof C
                ? C[k]
                : k extends K1
                ? R1
                : k extends K2
                ? R2
                : k extends K3
                ? R3
                : k extends K4
                ? R4
                : k extends K5
                ? R5
                : k extends K6
                ? R6
                : k extends K7
                ? R7
                : k extends K8
                ? R8
                : k extends K9
                ? R9
                : k extends K10
                ? R10
                : k extends K11
                ? R11
                : k extends K12
                ? R12
                : k extends K13
                ? R13
                : k extends K14
                ? R14
                : k extends K15
                ? R15
                : k extends K16
                ? R16
                : k extends K17
                ? R17
                : k extends K18
                ? R18
                : R19
            }) => R20 | Promise<R20>)
  },
  only?: (
    | K1
    | K2
    | K3
    | K4
    | K5
    | K6
    | K7
    | K8
    | K9
    | K10
    | K11
    | K12
    | K13
    | K14
    | K15
    | K16
    | K17
    | K18
    | K19
    | K20
  )[]
) => Promise<{
  [k in
    | K1
    | K2
    | K3
    | K4
    | K5
    | K6
    | K7
    | K8
    | K9
    | K10
    | K11
    | K12
    | K13
    | K14
    | K15
    | K16
    | K17
    | K18
    | K19
    | K20
    | keyof C]: k extends keyof C
    ? C[k]
    : k extends K1
    ? R1
    : k extends K2
    ? R2
    : k extends K3
    ? R3
    : k extends K4
    ? R4
    : k extends K5
    ? R5
    : k extends K6
    ? R6
    : k extends K7
    ? R7
    : k extends K8
    ? R8
    : k extends K9
    ? R9
    : k extends K10
    ? R10
    : k extends K11
    ? R11
    : k extends K12
    ? R12
    : k extends K13
    ? R13
    : k extends K14
    ? R14
    : k extends K15
    ? R15
    : k extends K16
    ? R16
    : k extends K17
    ? R17
    : k extends K18
    ? R18
    : k extends K19
    ? R19
    : R20
}>
export function klubok(...fns: KeyedFunction<string, Function>[]) {
  const funcs = fns.filter(f => !f.onError)
  const onError = fns.find(f => f.onError)

  return async (rootCtx = {}, mock?: object, only?: string[]) => {
    let isExit = false

    if (mock == null && only == null) {
      let ctx = rootCtx
      for (const fn of funcs) {
        if (!fn.mutable && (ctx as Record<string, unknown>)[fn.key]) {
          throw new Error(`Try to override existing alias "${fn.key}". Let's rename alias or use "mut" wrapper`)
        }
        if (isExit) {
          break
        }
        try {
          const resp = await fn(ctx)
          if (fn.exitable && resp) {
            isExit = true
          }
          ctx = { ...ctx, [fn.key]: resp }
        } catch (error) {
          await onError?.({ ...ctx, $error: error })
          if (error instanceof Error) {
            error.stack += '\ncontext: ' + inspect(ctx)
          }
          throw error
        }
      }
      return ctx
    }

    return funcs.reduce(
      (acc, fn) =>
        acc.then(ctx =>
          !fn.mutable && Reflect.has(ctx, fn.key) && !Reflect.has(mock ?? {}, fn.key)
            ? Promise.reject(
                new Error(`Try to override existing alias "${fn.key}". Let's rename alias or use "mut" wrapper`)
              )
            : (mock && Reflect.has(mock, fn.key) && typeof Reflect.get(mock, fn.key) !== 'function') ||
              (only && only.length && !only.includes(fn.key))
            ? ctx
            : (async () => {
                try {
                  if (isExit) {
                    return ctx
                  }
                  return await Promise.resolve(
                    mock && Reflect.has(mock, fn.key) && typeof Reflect.get(mock, fn.key) === 'function'
                      ? Reflect.get(mock, fn.key)(ctx)
                      : fn(ctx)
                  ).then(resp => (fn.exitable && resp && (isExit = true), { ...ctx, [fn.key]: resp }))
                } catch (error) {
                  await onError?.({ ...ctx, $error: error })
                  if (error instanceof Error) {
                    error.stack += '\ncontext: ' + inspect(ctx)
                  }
                  throw error
                }
              })()
        ),
      Promise.resolve({ ...rootCtx, ...mock } as Record<string, unknown>)
    )
  }
}
