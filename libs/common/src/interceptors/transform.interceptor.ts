import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { map, Observable } from 'rxjs'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly dtoClass: new () => any) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data?.pages) {
          // Response with pagination
          return { ...data, items: plainToInstance(this.dtoClass, data.items) }
        }

        return plainToInstance(this.dtoClass, data)
      })
    )
  }
}
