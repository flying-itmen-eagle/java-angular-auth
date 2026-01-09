import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // 記得引入剛剛寫的 Service

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // 取得目前的 Token
    const token = this.authService.getToken();

    if (token) {
      // 如果有 Token，就複製一份 Request 並加入 Authorization Header
      // 注意：Request 是不可變的 (Immutable)，所以必須 clone
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // 送出加料後的 Request
      return next.handle(clonedRequest);
    }

    // 如果沒 Token (例如登入請求本身)，就直接送出原 Request
    return next.handle(request);
  }
}
