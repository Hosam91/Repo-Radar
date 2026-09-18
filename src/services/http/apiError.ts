export type ApiErrorCode =
  | 'unauthorized'
  | 'forbidden'
  | 'notFound'
  | 'validation'
  | 'rateLimit'
  | 'server'
  | 'network'
  | 'unknown'

export class ApiError extends Error {
  code: ApiErrorCode
  status: number | null

  constructor(
    message: string,
    code: ApiErrorCode,
    status: number | null = null,
  ) {
    super(message)

    this.name = 'ApiError'
    this.code = code
    this.status = status
  }
}