import test from 'node:test'
import { eff, klubok, pure } from './index.ts'
import assert from 'node:assert'

test('1 param sync, resp', async () => {
  const fn = klubok(pure('incNumber', (ctx: { number: number }) => ctx.number + 1))
  const resp = await fn({ number: 1 })
  assert.strictEqual(resp.number, 1)
  assert.strictEqual(resp.incNumber, 2)
})

test('1 param async, resp', async () => {
  const fn = klubok(eff('incNumber', async (ctx: { number: number }) => ctx.number + 1))
  assert.deepStrictEqual(await fn({ number: 1 }), { number: 1, incNumber: 2 })
})

test('1 param sync, mocked', async () => {
  const fn = klubok(pure('incNumber', (ctx: { number: number }) => ctx.number + 1))
  assert.deepStrictEqual(await fn({ number: 1 }, { incNumber: 1 }), { number: 1, incNumber: 1 })
})

test('1 param async, mocked', async () => {
  const fn = klubok(eff('incNumber', async (ctx: { number: number }) => ctx.number + 1))
  assert.deepStrictEqual(await fn({ number: 1 }, { incNumber: 1 }), { number: 1, incNumber: 1 })
})

test('2 params sync, resp', async () => {
  const fn = klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    pure('strNumber', ({ incNumber }) => incNumber.toString())
  )
  assert.deepStrictEqual(await fn({ number: 1 }), { number: 1, incNumber: 2, strNumber: '2' })
})

test('2 params async, resp', async () => {
  const fn = klubok(
    eff('incNumber', async (ctx: { number: number }) => ctx.number + 1),
    eff('strNumber', async ({ incNumber }) => incNumber.toString())
  )
  assert.deepStrictEqual(await fn({ number: 1 }), { number: 1, incNumber: 2, strNumber: '2' })
})

test('2 params sync, mock', async () => {
  const fn = klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    pure('strNumber', ({ incNumber }) => incNumber.toString())
  )
  assert.deepStrictEqual(await fn({ number: 1 }, { strNumber: '' }), { number: 1, incNumber: 2, strNumber: '' })
})

test('2 params async, mock', async () => {
  const fn = klubok(
    eff('incNumber', async (ctx: { number: number }) => ctx.number + 1),
    eff('strNumber', async ({ incNumber }) => incNumber.toString())
  )
  assert.deepStrictEqual(await fn({ number: 1 }, { strNumber: '' }), { number: 1, incNumber: 2, strNumber: '' })
})

test('2 params async, only', async () => {
  const fn = klubok(
    eff('incNumber', async (ctx: { number: number }) => ctx.number + 1),
    eff('strNumber', async ({ incNumber }) => incNumber.toString())
  )
  assert.deepStrictEqual(await fn({ number: 1 }, {}, ['incNumber']), {
    number: 1,
    incNumber: 2,
  })
})

test('3 params sync, resp', async () => {
  const fn = klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    pure('strNumber', ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length)
  )
  assert.deepStrictEqual(await fn({ number: 1 }), { number: 1, incNumber: 2, strNumber: '2', strLength: 1 })
})

test('4 params sync, resp', async () => {
  const fn = klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    pure('strNumber', ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length),
    pure('strLengthPositive', ({ strLength }) => strLength > 0)
  )
  assert.deepStrictEqual(await fn({ number: 1 }), {
    number: 1,
    incNumber: 2,
    strNumber: '2',
    strLength: 1,
    strLengthPositive: true,
  })
})

test('5 params sync, resp', async () => {
  const fn = klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    pure('strNumber', ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length),
    pure('strLengthPositive', ({ strLength }) => strLength > 0),
    pure('sum', ({ strLength, incNumber }) => strLength + incNumber)
  )
  assert.deepStrictEqual(await fn({ number: 1 }), {
    number: 1,
    incNumber: 2,
    strNumber: '2',
    strLength: 1,
    strLengthPositive: true,
    sum: 3,
  })
})

test('6 params sync, resp', async () => {
  const fn = klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    pure('strNumber', ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length),
    pure('strLengthPositive', ({ strLength }) => strLength > 0),
    pure('sum', ({ strLength, incNumber }) => strLength + incNumber),
    pure('numbersArray', ({ number, incNumber, strLength, sum }) => [number, incNumber, strLength, sum])
  )
  assert.deepStrictEqual(await fn({ number: 1 }), {
    number: 1,
    incNumber: 2,
    strNumber: '2',
    strLength: 1,
    strLengthPositive: true,
    sum: 3,
    numbersArray: [1, 2, 1, 3],
  })
})

test('7 params sync, resp', async () => {
  const fn = klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    pure('strNumber', ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length),
    pure('strLengthPositive', ({ strLength }) => strLength > 0),
    pure('sum', ({ strLength, incNumber }) => strLength + incNumber),
    pure('numbersArray', ({ number, incNumber, strLength, sum }) => [number, incNumber, strLength, sum]),
    pure('arrLength', ({ numbersArray }) => numbersArray.length)
  )
  assert.deepStrictEqual(await fn({ number: 1 }), {
    number: 1,
    incNumber: 2,
    strNumber: '2',
    strLength: 1,
    strLengthPositive: true,
    sum: 3,
    numbersArray: [1, 2, 1, 3],
    arrLength: 4,
  })
})

test('8 params sync, mock', async () => {
  const fn = klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    pure('strNumber', ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length),
    pure('strLengthPositive', ({ strLength }) => strLength > 0),
    pure('sum', ({ strLength, incNumber }) => strLength + incNumber),
    pure('numbersArray', ({ number, incNumber, strLength, sum }) => [number, incNumber, strLength, sum]),
    pure('arrLength', ({ numbersArray }) => numbersArray.length),
    pure('isMocked', ({ numbersArray }) => numbersArray.length === 0)
  )
  assert.deepStrictEqual(await fn({ number: 1 }, { numbersArray: [] }), {
    number: 1,
    incNumber: 2,
    strNumber: '2',
    strLength: 1,
    strLengthPositive: true,
    sum: 3,
    numbersArray: [],
    arrLength: 0,
    isMocked: true,
  })
})

test('8 params sync, mock via fn', async () => {
  const fn = klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    pure('strNumber', ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length),
    pure('strLengthPositive', ({ strLength }) => strLength > 0),
    pure('sum', ({ strLength, incNumber }) => strLength + incNumber),
    pure('numbersArray', ({ number, incNumber, strLength, sum }) => [number, incNumber, strLength, sum]),
    pure('arrLength', ({ numbersArray }) => numbersArray.length),
    pure('isMocked', ({ numbersArray }) => numbersArray.length === 0)
  )
  assert.deepStrictEqual(
    await fn({ number: 1 }, { numbersArray: ({ strNumber }) => (assert.strictEqual(strNumber, '2'), []) }),
    {
      number: 1,
      incNumber: 2,
      strNumber: '2',
      strLength: 1,
      strLengthPositive: true,
      sum: 3,
      numbersArray: [],
      arrLength: 0,
      isMocked: true,
    }
  )
})

test('9 params sync, only', async () => {
  const fn = klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    pure('strNumber', ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length),
    pure('strLengthPositive', ({ strLength }) => strLength > 0),
    pure('sum', ({ strLength, incNumber }) => strLength + incNumber),
    pure('numbersArray', ({ number, incNumber, strLength, sum }) => [number, incNumber, strLength, sum]),
    pure('arrLength', ({ numbersArray }) => numbersArray.length),
    pure('isMocked', ({ numbersArray }) => numbersArray.length === 0),
    pure('neverExists', () => null)
  )
  assert.deepStrictEqual(await fn({ number: 1 }, {}, ['strLength', 'strNumber', 'incNumber']), {
    number: 1,
    incNumber: 2,
    strNumber: '2',
    strLength: 1,
  })
})

test('10 params sync, resp', async () => {
  const fn = klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    pure('strNumber', ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length),
    pure('strLengthPositive', ({ strLength }) => strLength > 0),
    pure('sum', ({ strLength, incNumber }) => strLength + incNumber),
    pure('numbersArray', ({ number, incNumber, strLength, sum }) => [number, incNumber, strLength, sum]),
    pure('arrLength', ({ numbersArray }) => numbersArray.length),
    pure('isMocked', ({ numbersArray }) => numbersArray.length === 0),
    pure('nullHere', () => null),
    pure('voidHere', () => void 0)
  )
  assert.deepStrictEqual(await fn({ number: 1 }), {
    number: 1,
    incNumber: 2,
    strNumber: '2',
    strLength: 1,
    strLengthPositive: true,
    sum: 3,
    numbersArray: [1, 2, 1, 3],
    arrLength: 4,
    isMocked: false,
    nullHere: null,
    voidHere: void 0,
  })
})
