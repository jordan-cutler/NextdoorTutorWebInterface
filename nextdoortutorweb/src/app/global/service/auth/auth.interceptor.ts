import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserSessionService } from '../user-session.service';

export class AuthInterceptor implements HttpInterceptor {

  constructor(private userSessionService: UserSessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userSession = this.userSessionService.getCurrentUserSession();
    if (req.method === 'POST' && userSession) {
      const bodyObject = req.body;
      bodyObject['userId'] = userSession.user.userId;
      bodyObject['sessionToken'] = userSession.sessionToken;
      const requestClone = req.clone({ body: bodyObject });
      return next.handle(requestClone);
    } else if (userSession) {
      const requestClone =
        req.clone({ params:
          req.params
            .append('userId', userSession.user.userId)
            .append('sessionToken', userSession.sessionToken)
        });
      return next.handle(requestClone);
    }
    return next.handle(req);
  }

}
