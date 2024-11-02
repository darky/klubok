import { eff, klubok, mut, pure } from './index'
import { expectType } from 'tsd'

expectType<
  (
    ctx: { number: number },
    mock?: { incNumber?: number | ((ctx: { number: number }) => number) } | undefined,
    only?: 'incNumber'[] | undefined
  ) => Promise<{ number: number } & { incNumber: number }>
>(klubok(pure('incNumber', (ctx: { number: number }) => ctx.number + 1)))

expectType<
  (
    ctx: { number: number },
    mock?: { incNumber?: number | ((ctx: { number: number }) => number) } | undefined,
    only?: 'incNumber'[] | undefined
  ) => Promise<{ number: number } & { incNumber: number }>
>(klubok(eff('incNumber', async (ctx: { number: number }) => ctx.number + 1)))

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string)
        })
      | undefined,
    only?: ('incNumber' | 'strNumber')[] | undefined
  ) => Promise<{ number: number } & { incNumber: number } & { strNumber: string }>
>(
  klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    eff('strNumber', async ({ incNumber }) => incNumber.toString())
  )
)

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string)
        } & {
          strLength?: number | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number)
        })
      | undefined,
    only?: ('incNumber' | 'strNumber' | 'strLength')[] | undefined
  ) => Promise<{ number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }>
>(
  klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    eff('strNumber', async ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length)
  )
)

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string)
        } & {
          strLength?: number | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean)
        })
      | undefined,
    only?: ('incNumber' | 'strNumber' | 'strLength' | 'strLengthPositive')[] | undefined
  ) => Promise<
    { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
      strLengthPositive: boolean
    }
  >
>(
  klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    eff('strNumber', async ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length),
    eff('strLengthPositive', async ({ strLength }) => strLength > 0)
  )
)

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string)
        } & {
          strLength?: number | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number)
        })
      | undefined,
    only?: ('incNumber' | 'strNumber' | 'strLength' | 'strLengthPositive' | 'sum')[] | undefined
  ) => Promise<
    { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
      strLengthPositive: boolean
    } & { sum: number }
  >
>(
  klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    eff('strNumber', async ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length),
    eff('strLengthPositive', async ({ strLength }) => strLength > 0),
    pure('sum', ({ strLength, incNumber }) => strLength + incNumber)
  )
)

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string)
        } & {
          strLength?: number | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[])
        })
      | undefined,
    only?: ('incNumber' | 'strNumber' | 'strLength' | 'strLengthPositive' | 'sum' | 'numbersArray')[] | undefined
  ) => Promise<
    { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
      strLengthPositive: boolean
    } & { sum: number } & { numbersArray: number[] }
  >
>(
  klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    eff('strNumber', async ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length),
    eff('strLengthPositive', async ({ strLength }) => strLength > 0),
    mut(pure('sum', ({ strLength, incNumber }) => strLength + incNumber)),
    eff('numbersArray', async ({ number, incNumber, strLength, sum }) => [number, incNumber, strLength, sum])
  )
)

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string)
        } & {
          strLength?: number | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[])
        } & {
          arrLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] }
              ) => number)
        })
      | undefined,
    only?:
      | ('incNumber' | 'strNumber' | 'strLength' | 'strLengthPositive' | 'sum' | 'numbersArray' | 'arrLength')[]
      | undefined
  ) => Promise<
    { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
      strLengthPositive: boolean
    } & { sum: number } & { numbersArray: number[] } & { arrLength: number }
  >
>(
  klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    eff('strNumber', async ({ incNumber }) => incNumber.toString()),
    eff('strLength', async ({ strNumber }) => strNumber.length),
    pure('strLengthPositive', ({ strLength }) => strLength > 0),
    pure('sum', ({ strLength, incNumber }) => strLength + incNumber),
    eff('numbersArray', async ({ number, incNumber, strLength, sum }) => [number, incNumber, strLength, sum]),
    mut(pure('arrLength', ({ numbersArray }) => numbersArray.length))
  )
)

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string)
        } & {
          strLength?: number | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[])
        } & {
          arrLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] }
              ) => number)
        } & {
          isMocked?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number }
              ) => boolean)
        })
      | undefined,
    only?:
      | (
          | 'incNumber'
          | 'strNumber'
          | 'strLength'
          | 'strLengthPositive'
          | 'sum'
          | 'numbersArray'
          | 'arrLength'
          | 'isMocked'
        )[]
      | undefined
  ) => Promise<
    { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
      strLengthPositive: boolean
    } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean }
  >
>(
  klubok(
    pure('incNumber', (ctx: { number: number }) => ctx.number + 1),
    pure('strNumber', ({ incNumber }) => incNumber.toString()),
    pure('strLength', ({ strNumber }) => strNumber.length),
    pure('strLengthPositive', ({ strLength }) => strLength > 0),
    pure('sum', ({ strLength, incNumber }) => strLength + incNumber),
    pure('numbersArray', ({ number, incNumber, strLength, sum }) => [number, incNumber, strLength, sum]),
    pure('arrLength', ({ numbersArray }) => numbersArray.length),
    pure('isMocked', ({ numbersArray }) => numbersArray.length === 0)
  )
)

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string)
        } & {
          strLength?: number | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[])
        } & {
          arrLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] }
              ) => number)
        } & {
          isMocked?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number }
              ) => boolean)
        } & {
          neverExists?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean }
              ) => null)
            | null
        })
      | undefined,
    only?:
      | (
          | 'incNumber'
          | 'strNumber'
          | 'strLength'
          | 'strLengthPositive'
          | 'sum'
          | 'numbersArray'
          | 'arrLength'
          | 'isMocked'
          | 'neverExists'
        )[]
      | undefined
  ) => Promise<
    { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
      strLengthPositive: boolean
    } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
      neverExists: null
    }
  >
>(
  klubok(
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
)

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string)
        } & {
          strLength?: number | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[])
        } & {
          arrLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] }
              ) => number)
        } & {
          isMocked?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number }
              ) => boolean)
        } & {
          nullHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean }
              ) => null)
            | null
        } & {
          voidHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                }
              ) => undefined)
            | undefined
        })
      | undefined,
    only?:
      | (
          | 'incNumber'
          | 'strNumber'
          | 'strLength'
          | 'strLengthPositive'
          | 'sum'
          | 'numbersArray'
          | 'arrLength'
          | 'isMocked'
          | 'nullHere'
          | 'voidHere'
        )[]
      | undefined
  ) => Promise<
    { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
      strLengthPositive: boolean
    } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
      nullHere: null
    } & { voidHere: undefined }
  >
>(
  klubok(
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
)
