import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class ExcludePasswordInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          if (Array.isArray(data)) {
            return data.map((item) => this.removePassword(item));
          }
          return this.removePassword(data);
        }),
      );
    }
  
    private removePassword(userHistory: any): any {
      if (userHistory && userHistory.user) {
        const { password, ...rest } = userHistory.user;
        return {
          ...userHistory,
          user: rest,
        };
      }
      return userHistory;
    }
  }
  