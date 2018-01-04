import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserSessionService } from '../shared/user-session/user-session.service';

export class AuthInterceptor implements HttpInterceptor {

  constructor(private userSessionService: UserSessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userSession = this.userSessionService.getCurrentUserSession();
    /*
    This is used to not intercept the file upload request we currently have. This is tech debt.
    TODO: Later, we will change the way we upload files so we don't have to do this workaround
     */
    if (req.headers.get('Content-Type')) {
      return next.handle(req.clone());
    }
    if (req.method === 'POST' && userSession) {
      const bodyObject = req.body;
      bodyObject['userId'] = userSession.getUser().userId;
      bodyObject['sessionToken'] = userSession.getSessionToken();
      const requestClone = req.clone({ body: bodyObject });
      return next.handle(requestClone);
    } else if (userSession) {
      const requestClone =
        req.clone({ params:
          req.params
            .append('userId', userSession.getUser().userId)
            .append('sessionToken', userSession.getSessionToken())
        });
      return next.handle(requestClone);
    }
    return next.handle(req);
  }

}
