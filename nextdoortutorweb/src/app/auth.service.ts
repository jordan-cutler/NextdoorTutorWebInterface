import GoogleAuth = gapi.auth2.GoogleAuth;

export class AuthService {
  readonly myClientId = '66818467629-8egqjjtg6obnmqbhgfu13qob5he5k4l5.apps.googleusercontent.com';
  auth2: GoogleAuth;
  
  initializeAuthorization(id: string, onsuccess: () => void) {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '66818467629-8egqjjtg6obnmqbhgfu13qob5he5k4l5.apps.googleusercontent.com',
        cookie_policy: 'single_host_origin',
        scope: 'profile'
      });
      this.attachSignin(document.getElementById(id), onsuccess);
    });
  }

  private attachSignin(element, onsuccess: () => void) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        onsuccess();
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  
  getAuth(): GoogleAuth {
    return this.auth2;
  }
}
