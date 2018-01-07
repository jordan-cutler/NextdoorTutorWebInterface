import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApplicationGlobals } from '../shared/ApplicationGlobals';

export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = ApplicationGlobals.getJwtFromLocalStorage();

    if (jwt) {
      const requestClone = req.clone({
        headers: req.headers.append('X-AUTH-TOKEN', jwt)
      });
      return next.handle(requestClone);
    }
    // if (req.headers.get('Content-Type')) {
    //   return next.handle(req.clone());
    // }
    // if (req.method === 'GET' && userSession) {
    //   const requestClone =
    //     req.clone({
    //       params:
    //         req.params
    //           .append('userId', userSession.getUser().userId)
    //           .append('sessionToken', userSession.getJwt())
    //     });
    //   return next.handle(requestClone);
    // } else if (userSession) {
    //   const bodyObject = req.body;
    //   bodyObject['userId'] = userSession.getUser().userId;
    //   bodyObject['sessionToken'] = userSession.getJwt();
    //   const requestClone = req.clone({ body: bodyObject });
    //   return next.handle(requestClone);
    // }
    return next.handle(req);
  }

}
