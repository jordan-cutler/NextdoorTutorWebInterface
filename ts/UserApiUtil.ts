class UserApiUtil {

    private static readonly SIGNINROUTE = "/user/loginWithGoogle";
    private static readonly SIGNOUTROUTE = "/user/logout";

    public static signInUser(idToken: string, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        HttpRequestUtil.PostRequest(UserApiUtil.SIGNINROUTE, {idToken: idToken}, successFunction, errorFunction);
    }

    public static signOutUser(successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        HttpRequestUtil.PostRequest(
            UserApiUtil.SIGNOUTROUTE,
            HttpRequestUtil.getSessionInfoJson(),
            successFunction, errorFunction
        );
    }
}