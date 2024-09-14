import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpHandlerFn, HttpRequest, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthService } from './shared/services/authService.service';

function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn){
  const authService = inject(AuthService)
  const accessToken = authService.token
  if(accessToken){
    const req = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
    })
    return next(req)
  }
  return next(request)
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor]))]
};
