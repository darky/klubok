import { eff, klubok, mut, pure } from './index'
import { expectType } from 'tsd'

expectType<
  (
    ctx: { number: number },
    mock?: { incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } | undefined,
    only?: 'incNumber'[] | undefined
  ) => Promise<{ number: number } & { incNumber: number }>
>(klubok(pure('incNumber', (ctx: { number: number }) => ctx.number + 1)))

expectType<
  (
    ctx: { number: number },
    mock?: { incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } | undefined,
    only?: 'incNumber'[] | undefined
  ) => Promise<{ number: number } & { incNumber: number }>
>(klubok(eff('incNumber', async (ctx: { number: number }) => ctx.number + 1)))

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
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
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
        } & {
          strLength?:
            | number
            | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number | Promise<number>)
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
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
        } & {
          strLength?:
            | number
            | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number | Promise<number>)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean | Promise<boolean>)
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
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
        } & {
          strLength?:
            | number
            | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number | Promise<number>)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number | Promise<number>)
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
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
        } & {
          strLength?:
            | number
            | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number | Promise<number>)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number | Promise<number>)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[] | Promise<number[]>)
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
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
        } & {
          strLength?:
            | number
            | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number | Promise<number>)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number | Promise<number>)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[] | Promise<number[]>)
        } & {
          arrLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] }
              ) => number | Promise<number>)
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
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
        } & {
          strLength?:
            | number
            | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number | Promise<number>)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number | Promise<number>)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[] | Promise<number[]>)
        } & {
          arrLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] }
              ) => number | Promise<number>)
        } & {
          isMocked?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number }
              ) => boolean | Promise<boolean>)
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
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
        } & {
          strLength?:
            | number
            | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number | Promise<number>)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number | Promise<number>)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[] | Promise<number[]>)
        } & {
          arrLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] }
              ) => number | Promise<number>)
        } & {
          isMocked?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          neverExists?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean }
              ) => null | Promise<null>)
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
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
        } & {
          strLength?:
            | number
            | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number | Promise<number>)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number | Promise<number>)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[] | Promise<number[]>)
        } & {
          arrLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] }
              ) => number | Promise<number>)
        } & {
          isMocked?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          nullHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean }
              ) => null | Promise<null>)
            | null
        } & {
          voidHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                }
              ) => undefined | Promise<undefined>)
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

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
        } & {
          strLength?:
            | number
            | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number | Promise<number>)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number | Promise<number>)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[] | Promise<number[]>)
        } & {
          arrLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] }
              ) => number | Promise<number>)
        } & {
          isMocked?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          nullHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean }
              ) => null | Promise<null>)
            | null
        } & {
          voidHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                }
              ) => undefined | Promise<undefined>)
            | undefined
        } & {
          arraySum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined }
              ) => number | Promise<number>)
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
          | 'arraySum'
        )[]
      | undefined
  ) => Promise<
    { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
      strLengthPositive: boolean
    } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
      nullHere: null
    } & { voidHere: undefined } & { arraySum: number }
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
    pure('voidHere', () => void 0),
    eff('arraySum', async ({ numbersArray }) => numbersArray.reduce((a, b) => a + b, 0))
  )
)

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
        } & {
          strLength?:
            | number
            | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number | Promise<number>)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number | Promise<number>)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[] | Promise<number[]>)
        } & {
          arrLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] }
              ) => number | Promise<number>)
        } & {
          isMocked?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          nullHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean }
              ) => null | Promise<null>)
            | null
        } & {
          voidHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                }
              ) => undefined | Promise<undefined>)
            | undefined
        } & {
          arraySum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined }
              ) => number | Promise<number>)
        } & {
          strConcat?:
            | string
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined } & { arraySum: number }
              ) => string | Promise<string>)
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
          | 'arraySum'
          | 'strConcat'
        )[]
      | undefined
  ) => Promise<
    { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
      strLengthPositive: boolean
    } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
      nullHere: null
    } & { voidHere: undefined } & { arraySum: number } & { strConcat: string }
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
    pure('voidHere', () => void 0),
    eff('arraySum', async ({ numbersArray }) => numbersArray.reduce((a, b) => a + b, 0)),
    pure('strConcat', ({ strLength, strLengthPositive, strNumber }) => `${strLength} ${strLengthPositive} ${strNumber}`)
  )
)

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
        } & {
          strLength?:
            | number
            | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number | Promise<number>)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number | Promise<number>)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[] | Promise<number[]>)
        } & {
          arrLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] }
              ) => number | Promise<number>)
        } & {
          isMocked?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          nullHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean }
              ) => null | Promise<null>)
            | null
        } & {
          voidHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                }
              ) => undefined | Promise<undefined>)
            | undefined
        } & {
          arraySum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined }
              ) => number | Promise<number>)
        } & {
          strConcat?:
            | string
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined } & { arraySum: number }
              ) => string | Promise<string>)
        } & {
          sumOfSums?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined } & { arraySum: number } & { strConcat: string }
              ) => number | Promise<number>)
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
          | 'arraySum'
          | 'strConcat'
          | 'sumOfSums'
        )[]
      | undefined
  ) => Promise<
    { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
      strLengthPositive: boolean
    } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
      nullHere: null
    } & { voidHere: undefined } & { arraySum: number } & { strConcat: string } & { sumOfSums: number }
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
    pure('voidHere', () => void 0),
    eff('arraySum', async ({ numbersArray }) => numbersArray.reduce((a, b) => a + b, 0)),
    pure(
      'strConcat',
      ({ strLength, strLengthPositive, strNumber }) => `${strLength} ${strLengthPositive} ${strNumber}`
    ),
    pure('sumOfSums', ({ sum, arraySum }) => sum + arraySum)
  )
)

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
        } & {
          strLength?:
            | number
            | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number | Promise<number>)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number | Promise<number>)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[] | Promise<number[]>)
        } & {
          arrLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] }
              ) => number | Promise<number>)
        } & {
          isMocked?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          nullHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean }
              ) => null | Promise<null>)
            | null
        } & {
          voidHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                }
              ) => undefined | Promise<undefined>)
            | undefined
        } & {
          arraySum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined }
              ) => number | Promise<number>)
        } & {
          strConcat?:
            | string
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined } & { arraySum: number }
              ) => string | Promise<string>)
        } & {
          sumOfSums?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined } & { arraySum: number } & { strConcat: string }
              ) => number | Promise<number>)
        } & {
          objectifySum?:
            | { arraySum: number; sum: number }
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined } & { arraySum: number } & { strConcat: string } & { sumOfSums: number }
              ) => { arraySum: number; sum: number } | Promise<{ arraySum: number; sum: number }>)
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
          | 'arraySum'
          | 'strConcat'
          | 'sumOfSums'
          | 'objectifySum'
        )[]
      | undefined
  ) => Promise<
    { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
      strLengthPositive: boolean
    } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
      nullHere: null
    } & { voidHere: undefined } & { arraySum: number } & { strConcat: string } & { sumOfSums: number } & {
      objectifySum: { arraySum: number; sum: number }
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
    pure('nullHere', () => null),
    pure('voidHere', () => void 0),
    eff('arraySum', async ({ numbersArray }) => numbersArray.reduce((a, b) => a + b, 0)),
    pure(
      'strConcat',
      ({ strLength, strLengthPositive, strNumber }) => `${strLength} ${strLengthPositive} ${strNumber}`
    ),
    pure('sumOfSums', ({ sum, arraySum }) => sum + arraySum),
    pure('objectifySum', ({ arraySum, sum }) => ({ arraySum, sum }))
  )
)

expectType<
  (
    ctx: { number: number },
    mock?:
      | ({ incNumber?: number | ((ctx: { number: number }) => number | Promise<number>) } & {
          strNumber?: string | ((ctx: { number: number } & { incNumber: number }) => string | Promise<string>)
        } & {
          strLength?:
            | number
            | ((ctx: { number: number } & { incNumber: number } & { strNumber: string }) => number | Promise<number>)
        } & {
          strLengthPositive?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          sum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                }
              ) => number | Promise<number>)
        } & {
          numbersArray?:
            | number[]
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number }
              ) => number[] | Promise<number[]>)
        } & {
          arrLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] }
              ) => number | Promise<number>)
        } & {
          isMocked?:
            | boolean
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number }
              ) => boolean | Promise<boolean>)
        } & {
          nullHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean }
              ) => null | Promise<null>)
            | null
        } & {
          voidHere?:
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                }
              ) => undefined | Promise<undefined>)
            | undefined
        } & {
          arraySum?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined }
              ) => number | Promise<number>)
        } & {
          strConcat?:
            | string
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined } & { arraySum: number }
              ) => string | Promise<string>)
        } & {
          sumOfSums?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined } & { arraySum: number } & { strConcat: string }
              ) => number | Promise<number>)
        } & {
          objectifySum?:
            | { arraySum: number; sum: number }
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined } & { arraySum: number } & { strConcat: string } & { sumOfSums: number }
              ) => { arraySum: number; sum: number } | Promise<{ arraySum: number; sum: number }>)
        } & {
          numbersArrayLength?:
            | number
            | ((
                ctx: { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
                  strLengthPositive: boolean
                } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
                  nullHere: null
                } & { voidHere: undefined } & { arraySum: number } & { strConcat: string } & { sumOfSums: number } & {
                  objectifySum: { arraySum: number; sum: number }
                }
              ) => number | Promise<number>)
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
          | 'arraySum'
          | 'strConcat'
          | 'sumOfSums'
          | 'objectifySum'
          | 'numbersArrayLength'
        )[]
      | undefined
  ) => Promise<
    { number: number } & { incNumber: number } & { strNumber: string } & { strLength: number } & {
      strLengthPositive: boolean
    } & { sum: number } & { numbersArray: number[] } & { arrLength: number } & { isMocked: boolean } & {
      nullHere: null
    } & { voidHere: undefined } & { arraySum: number } & { strConcat: string } & { sumOfSums: number } & {
      objectifySum: { arraySum: number; sum: number }
    } & { numbersArrayLength: number }
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
    pure('voidHere', () => void 0),
    eff('arraySum', async ({ numbersArray }) => numbersArray.reduce((a, b) => a + b, 0)),
    pure(
      'strConcat',
      ({ strLength, strLengthPositive, strNumber }) => `${strLength} ${strLengthPositive} ${strNumber}`
    ),
    pure('sumOfSums', ({ sum, arraySum }) => sum + arraySum),
    pure('objectifySum', ({ arraySum, sum }) => ({ arraySum, sum })),
    pure('numbersArrayLength', ({ numbersArray }) => numbersArray.length)
  )
)
