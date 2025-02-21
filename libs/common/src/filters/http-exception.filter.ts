import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { Response } from 'express'

import { ERROR_MESSAGES } from '../constants'
import { ValidationErrorPayload } from '../pipes/validation.pipe'

// Define the type for possible exception payloads
type ExceptionPayload = { message: string } | ValidationErrorPayload

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger?: Logger

  constructor(options?: { logging: boolean }) {
    if (options?.logging) {
      // Initialize logger only if logging is enabled
      this.logger = new Logger(HttpExceptionFilter.name)
    }
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let payload: ExceptionPayload = { message: 'Internal server error' }

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse()
      status = exception.getStatus()

      if (typeof exceptionResponse === 'string') {
        payload = { message: exceptionResponse }
      } else if (typeof exceptionResponse === 'object') {
        payload = this.handleHttpException(exceptionResponse, status)
      }
    } else {
      this.logger?.error('[UnhandledException]', exception)
    }

    response.status(status).json(payload)
  }

  /**
   * Handles known HTTP exceptions and structures the response accordingly.
   */
  private handleHttpException(exceptionResponse: Record<string, any>, status: number): ExceptionPayload {
    this.logger?.error(`[HttpException] Status: ${status}`, exceptionResponse)

    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return this.handleBadRequest(exceptionResponse)
      case HttpStatus.UNAUTHORIZED:
        return { message: ERROR_MESSAGES.unauthorized401 }
      case HttpStatus.FORBIDDEN:
        return { message: ERROR_MESSAGES.forbidden403 }
      case HttpStatus.NOT_FOUND:
        return { message: ERROR_MESSAGES.notFound404 }
      default:
        return { message: exceptionResponse.message || 'An unexpected error occurred.' }
    }
  }

  /**
   * Handles 400 Bad Request errors, including validation errors.
   */
  private handleBadRequest(exceptionResponse: Record<string, any>): ExceptionPayload {
    if (exceptionResponse.validationError) {
      return exceptionResponse
    }
    return { message: exceptionResponse.message || ERROR_MESSAGES.badRequest400 }
  }
}
