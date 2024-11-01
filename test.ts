import test from 'node:test'
import { asynk, klubok, synk } from './index.ts'
import assert from 'node:assert'

test('1 param sync, resp', async () => {
  const fn = klubok(synk('incNumber', (ctx: { number: number }) => ctx.number + 1))
  assert.deepStrictEqual(await fn({ number: 1 }), { number: 1, incNumber: 2 })
})

test('1 param async, resp', async () => {
  const fn = klubok(asynk('incNumber', async (ctx: { number: number }) => ctx.number + 1))
  assert.deepStrictEqual(await fn({ number: 1 }), { number: 1, incNumber: 2 })
})

test('1 param sync, mocked', async () => {
  const fn = klubok(synk('incNumber', (ctx: { number: number }) => ctx.number + 1))
  assert.deepStrictEqual(await fn({ number: 1, incNumber: 1 }), { number: 1, incNumber: 1 })
})

test('1 param async, mocked', async () => {
  const fn = klubok(asynk('incNumber', async (ctx: { number: number }) => ctx.number + 1))
  assert.deepStrictEqual(await fn({ number: 1, incNumber: 1 }), { number: 1, incNumber: 1 })
})

test('2 params sync, resp', async () => {
  const fn = klubok(
    synk('incNumber', (ctx: { number: number }) => ctx.number + 1),
    synk('strNumber', ({ incNumber }) => incNumber.toString())
  )
  assert.deepStrictEqual(await fn({ number: 1 }), { number: 1, incNumber: 2, strNumber: '2' })
})

test('2 params async, resp', async () => {
  const fn = klubok(
    asynk('incNumber', async (ctx: { number: number }) => ctx.number + 1),
    asynk('strNumber', async ({ incNumber }) => incNumber.toString())
  )
  assert.deepStrictEqual(await fn({ number: 1 }), { number: 1, incNumber: 2, strNumber: '2' })
})

test('2 params sync, mock', async () => {
  const fn = klubok(
    synk('incNumber', (ctx: { number: number }) => ctx.number + 1),
    synk('strNumber', ({ incNumber }) => incNumber.toString())
  )
  assert.deepStrictEqual(await fn({ number: 1, strNumber: '' }), { number: 1, incNumber: 2, strNumber: '' })
})

test('2 params async, mock', async () => {
  const fn = klubok(
    asynk('incNumber', async (ctx: { number: number }) => ctx.number + 1),
    asynk('strNumber', async ({ incNumber }) => incNumber.toString())
  )
  assert.deepStrictEqual(await fn({ number: 1, strNumber: '' }), { number: 1, incNumber: 2, strNumber: '' })
})

test('2 params async, only', async () => {
  const fn = klubok(
    asynk('incNumber', async (ctx: { number: number }) => ctx.number + 1),
    asynk('strNumber', async ({ incNumber }) => incNumber.toString())
  )
  assert.deepStrictEqual(await fn({ number: 1 }, new Set(['incNumber'])), {
    number: 1,
    incNumber: 2,
  })
})
