import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()

    const startTime = Date.now()

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now()
        const statusCode = response.statusCode
        const url = request.url

        console.info(`Request URL: ${url} | Response Code: ${statusCode} | Duration: ${(endTime - startTime) / 1000}s`)
      })
    )
  }
}
