class UserApiUtil {

    private static readonly SIGNINROUTE = "/user/loginWithGoogle";
    private static readonly SIGNOUTROUTE = "/user/logout";
    private static readonly UPDATEBIOROUTE = "/user/bio";
    private static readonly UPDATEMAJORROUTE = "/user/major";

    public static updateBio(bio: string, successFunction: (data: any) => any, errorFunction: (data: any) => any): any {
        return UserApiUtil.updateField("bio", bio, UserApiUtil.UPDATEBIOROUTE, successFunction, errorFunction);
    }

    public static updateMajor(major: string, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        return UserApiUtil.updateField("major", major, UserApiUtil.UPDATEMAJORROUTE, successFunction, errorFunction);
    }

    public static updateField(fieldName: string, fieldValue: string, route: string, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        return HttpRequestUtil.PutRequest(
            route,
            {
                [fieldName]: fieldValue,
                userId: UserSession.userId(),
                sessionToken: UserSession.sessionToken()
            },
            successFunction, errorFunction
        )
    }

    public static signInUser(idToken: string, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        return HttpRequestUtil.PostRequest(UserApiUtil.SIGNINROUTE, {idToken: idToken}, successFunction, errorFunction);
    }

    public static signOutUser(successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        return HttpRequestUtil.PostRequest(
            UserApiUtil.SIGNOUTROUTE,
            HttpRequestUtil.getSessionInfoJson(),
            successFunction, errorFunction
        );
    }
}