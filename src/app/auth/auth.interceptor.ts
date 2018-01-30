import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApplicationGlobals } from '@shared/ApplicationGlobals';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PreloaderService } from '@core/preloader/preloader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private preloaderService: PreloaderService) {
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      // navigate /delete cookies or whatever
      Materialize.toast('Your session has ended. Please log back in.', 3000);
      this.router.navigate(['/']);
      // if you've caught / handled the error, you don't want to rethrow it
      // unless you also want downstream consumers to have to handle it as well.
      this.preloaderService.hide();
      return Observable.of(err.message);
    }
    return Observable.throw(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = ApplicationGlobals.getJwtFromLocalStorage();
    let headers = req.headers.append('X-Requested-With', '');
    if (jwt) {
      headers = headers.append('X-AUTH-TOKEN', jwt);
    }

    const requestClone = req.clone({
      headers: headers
    });
    return next.handle(requestClone).catch(err => this.handleAuthError(err));
  }

}
