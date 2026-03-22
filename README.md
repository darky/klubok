# Klubok

![logo](logo.png)

[![npm version](https://badge.fury.io/js/klubok.svg)](https://badge.fury.io/js/klubok)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Do-notation pipes for Promise-based or pure functions with easy mocking.**

Inspired by fp-ts/Effect `bind` Do-notation, but smaller and simpler. Primarily created for easy mocking of functions, allowing you to write extensive unit tests using the London school approach.

## Features

- 🔄 **Sequential composition** — Chain pure and async functions with automatic context passing
- 🧪 **Easy mocking** — Mock any step in the pipeline without complex dependency injection
- 🎯 **Selective execution** — Run only specific functions using the `only` parameter
- 🛡️ **Type-safe** — Full TypeScript support with inferred types for up to 20 functions
- 🐛 **Debug-friendly** — Automatic context attachment to errors for easier debugging
- ⚡ **Mutable state** — Support for mutable operations when needed

## Installation

```bash
npm install klubok
```

## Quick Start

```ts
import { pure, eff, klubok } from 'klubok'

const catsBirthdays = klubok(
  eff('cats', async ({ ids }: { ids: number[] }) => {
    /* fetch cats from DB */
  }),

  pure('catsOneYearOld', ({ cats }) =>
    cats.map(cat => ({ ...cat, age: cat.age + 1 }))
  ),

  eff('saved', async ({ catsOneYearOld }) => {
    /* save to DB */
  })
)

// Production usage
catsBirthdays({ ids: [1, 2, 3] })

// In tests: mock 'cats' and run only 'catsOneYearOld'
catsBirthdays(
  { ids: [1, 2, 3] },
  {
    // DB response mock
    cats: () => [
      { name: 'Barsik', age: 10 },
      { name: 'Marfa', age: 7 }
    ]
  },
  // call only this function
  ['catsOneYearOld']
)
// Promise<{ cats: [...], catsOneYearOld: [{ name: 'Barsik', age: 11 }, ...] }>
```

## API Reference

### `pure<K, C, R>(key: K, fn: (ctx: C) => R)`

Creates a **synchronous** keyed function for the pipeline.

```ts
import { pure, klubok } from 'klubok'

const fn = klubok(
  pure('inc', (ctx: { number: number }) => ctx.number + 1),
  pure('str', ({ inc }) => inc.toString())
)

await fn({ number: 1 })
// { number: 1, inc: 2, str: '2' }
```

### `eff<K, C, R>(key: K, fn: (ctx: C) => Promise<R>)`

Creates an **asynchronous** (Promise-based) keyed function for the pipeline.

```ts
import { eff, klubok } from 'klubok'

const fn = klubok(
  eff('fetchUser', async ({ id }: { id: number }) => {
    return { id, name: 'Alice' }
  }),
  eff('fetchPosts', async ({ user }) => {
    return [{ title: 'Hello' }]
  })
)

await fn({ id: 1 })
// { id: 1, user: {...}, posts: [...] }
```

### `mut(fn: KeyedFunction)`

Marks a function as **mutable**, allowing it to override a previous result with the same key.

```ts
import { pure, mut, klubok } from 'klubok'

const fn = klubok(
  pure('data', () => [1, 2, 3]),
  mut(pure('data', ({ data }) => data.map(x => x * 2)))
)

await fn({})
// { data: [2, 4, 6] }
```

### `klubok(...fns)`

Main function that composes keyed functions into a pipeline. Returns a function with the signature:

```ts
(
  ctx: C,
  mock?: { [key: string]: value | ((ctx) => value | Promise<value>) },
  only?: string[]
) => Promise<{ ...ctx, ...results }>
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `ctx` | `object` | Initial context (input data) |
| `mock` | `object` (optional) | Mock implementations for any step. Values can be static or functions |
| `only` | `string[]` (optional) | Execute only specified keys, skipping others |

## Mocking

### Static Mocks

Replace a function's result with a static value:

```ts
const fn = klubok(
  eff('fetchData', async () => {
    /* real API call */
  }),
  pure('process', ({ fetchData }) => fetchData.map(x => x * 2))
)

await fn({}, { fetchData: [1, 2, 3] })
// { fetchData: [1, 2, 3], process: [2, 4, 6] }
```

### Function Mocks

Replace a function with a custom implementation (sync or async):

```ts
await fn(
  {},
  {
    fetchData: () => [1, 2, 3],
    process: ({ fetchData }) => fetchData.filter(x => x > 1)
  }
)
```

### Mocks with Context Access

Mock functions receive the accumulated context:

```ts
await fn(
  { userId: 42 },
  {
    fetchData: ({ userId }) => {
      console.log('Mock called with userId:', userId)
      return [{ id: userId, value: 100 }]
    }
  }
)
```

## Selective Execution (`only`)

Run only specific functions in the pipeline:

```ts
const fn = klubok(
  eff('step1', async () => { /* ... */ }),
  pure('step2', ({ step1 }) => step1 * 2),
  eff('step3', async ({ step2 }) => { /* ... */ })
)

// Execute only step1 and step2
await fn({}, {}, ['step1', 'step2'])
// { step1: ..., step2: ... } — step3 is skipped
```

Useful for unit testing individual transformations without running the entire pipeline.

## Error Handling

### Automatic Context Attachment

When an error is thrown, Klubok automatically attaches the current context to the error stack:

```ts
const fn = klubok(
  pure('step1', () => 42),
  eff('step2', async ({ step1 }) => {
    throw new Error('Failed!')
  })
)

try {
  await fn({})
} catch (e) {
  console.log(e.stack)
  // Error: Failed!
  //   at ...
  // context: { step1: 42 }
}
```

### Approved Errors

Errors with `isApproved = true` property won't have context attached (useful for expected business logic errors):

```ts
class ApprovedError extends Error {
  isApproved = true
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}

const fn = klubok(
  eff('validate', async () => {
    throw new ApprovedError('Invalid input')
  })
)
```

## Type Safety

Klubok provides full TypeScript inference for pipelines up to 20 functions. Each step's output type is automatically added to the context type for subsequent steps:

```ts
const fn = klubok(
  pure('a', (ctx: { x: number }) => ctx.x + 1),        // ctx: { x: number }
  pure('b', ({ a }) => a.toString()),                  // ctx: { x: number, a: number }
  pure('c', ({ a, b }) => a + b.length)                // ctx: { x: number, a: number, b: string }
)
// Result: Promise<{ x: number, a: number, b: string, c: number }>
```

## Use Cases

### Testing with London School Approach

Mock external dependencies at any level without changing production code:

```ts
// production.ts
export const processOrder = klubok(
  eff('fetchOrder', async ({ orderId }) => db.orders.find(orderId)),
  eff('validateStock', async ({ fetchOrder }) => warehouse.check(fetchOrder)),
  eff('chargePayment', async ({ fetchOrder }) => paymentGateway.charge(fetchOrder)),
  eff('shipItems', async ({ fetchOrder, chargePayment }) => shipping.create(fetchOrder))
)

// test.ts
await processOrder(
  { orderId: 123 },
  {
    fetchOrder: () => ({ id: 123, items: ['item1'] }),
    validateStock: () => true
  },
  ['chargePayment'] // Test only payment logic
)
```

### Data Transformation Pipelines

Chain pure transformations with clear, testable steps:

```ts
const transformData = klubok(
  pure('parsed', ({ raw }: { raw: string }) => JSON.parse(raw)),
  pure('validated', ({ parsed }) => schema.parse(parsed)),
  pure('normalized', ({ validated }) => normalize(validated)),
  pure('enriched', ({ normalized }) => addMetadata(normalized))
)
```

## See Also

- [Klubok-Gleam](https://github.com/darky/klubok-gleam) — Gleam implementation of Klubok

## License

MIT © [Vladislav Botvin](https://github.com/darky)
