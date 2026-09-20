export type Left<T> = {
  left: T
  right?: never
}

export type Right<U> = {
  left?: never
  right: U
}

export type Either<T, U> = NonNullable<Left<T> | Right<U>>

// checa se e um resultado de erro
export const isLeft = <T, U>(e: Either<T, U>): e is Left<T> => {
  return e.left !== undefined
}

// checa se e um resultado de sucesso
export const isRight = <T, U>(e: Either<T, U>): e is Right<U> => {
  return e.right !== undefined
}

export type UnwrapEither = <T, U>(e: Either<T, U>) => NonNullable<T | U>

export const unwrapEither: UnwrapEither = <T, U>({
  left,
  right,
}: Either<T, U>) => {
  if (right !== undefined && left !== undefined) {
    throw new Error(
      `Received both left and right values at runtime when opening an Either\nLeft: ${JSON.stringify(
        left
      )}\nRight: ${JSON.stringify(right)}`
    )
  }

  if (left !== undefined) {
    return left as NonNullable<T>
  }

  if (right !== undefined) {
    return right as NonNullable<U>
  }

  throw new Error(
    'Received no left or right values at runtime when opening Either'
  )
}

// cria um erro
export const makeLeft = <T>(value: T): Left<T> => ({ left: value })

// cria um sucesso
export const makeRight = <U>(value: U): Right<U> => ({ right: value })
