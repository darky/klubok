# Klubok

![logo](logo.png)

Do notation pipes for Promise-based or pure functions which easy to mock <br/>
Inspired by fp-ts/Effect `bind` Do-notation, but much more small and simple <br/>
Primarly created for easy mocking of functions, which allows to write tons of unit tests

## Example

```ts
import { pure, eff, klubok } from 'klubok';

const catsBirthdays = klubok(
  eff('cats', async ({ ids }: { ids: number[] }) => { /* fetch cats from DB */ }),
  pure('catsOneYearOld', ({ cats }) => cats.map(c => ({ ...c, age: c.age + 1 })),
  eff('saved', async ({ catsOneYearOld }) => { /* save to DB */ })
)

catsBirthdays({ ids: [1, 2, 3] }) // production implementation

catsBirthdays(
  { ids: [1, 2, 3] },
  {
    cats: [ // DB response mock, can be function
      { name: 'Barsik', age: 10 },
      { name: 'Marfa', age: 7 }
    ]
  },
  new Set(['catsOneYearOld']) // call only this functions
) // Promise<{ ..., catsOneYearOld: [{ name: 'Barsik', age: 11 }, { name: 'Marfa', age: 8 }] }>

```

