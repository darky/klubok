import { Bench } from 'tinybench'
import { klubok, pure } from './index.ts'
import { klubok as klubokOld, pure as pureOld } from 'klubok'

const bench = new Bench()

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

const fnOld = klubokOld(
  pureOld('incNumber', (ctx: { number: number }) => ctx.number + 1),
  pureOld('strNumber', ({ incNumber }) => incNumber.toString()),
  pureOld('strLength', ({ strNumber }) => strNumber.length),
  pureOld('strLengthPositive', ({ strLength }) => strLength > 0),
  pureOld('sum', ({ strLength, incNumber }) => strLength + incNumber),
  pureOld('numbersArray', ({ number, incNumber, strLength, sum }) => [number, incNumber, strLength, sum]),
  pureOld('arrLength', ({ numbersArray }) => numbersArray.length),
  pureOld('isMocked', ({ numbersArray }) => numbersArray.length === 0),
  pureOld('neverExists', () => null)
)

bench
  .add('master', async () => {
    await fn({ number: 1 })
  })
  .add('0.4.5', async () => {
    await fnOld({ number: 1 })
  })

//
;(async () => {
  await bench.run()

  console.table(bench.table())
})()
