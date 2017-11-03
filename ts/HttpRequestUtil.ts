class HttpRequestUtil {

    public static readonly EMPTYFUNCTION = function() {};
    public static getSessionInfoJson() {
        return { userId: User.userId(), sessionToken: User.sessionToken() };
    }

    // TODO(alam): Check how to make it so when this utility is used, we pass the User sessionToken and userId as default on top of everything else, that way all other requests that call these methods don't have to pass those two things every time
    public static GetRequest(route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        HttpRequestUtil.GetWrapper("GET", route, params, successFunction, errorFunction);
    }

    public static PostRequest(route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        HttpRequestUtil.PostWrapper("POST", route, params, successFunction, errorFunction);
    }

    public static GetWrapper(method: string, route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        $.ajax({
                url: route,
                type: method,
                processData: true, // says to convert the "params" passed to query string
                data: params,
                contentType: "application/json",
                dataType: "json", // what we expect back from server
                success: successFunction,
                error: errorFunction
            }
        );
    }

    private static PostWrapper(method: string, route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        $.ajax({
                url: route,
                type: method,
                processData: true,
                data: JSON.stringify(params),
                contentType: "application/json",
                dataType: "json", // what we expect back from server
                success: successFunction,
                error: errorFunction
            }
        );
    }
}
