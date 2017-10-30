class HttpRequestUtil {

    public static readonly EMPTYFUNCTION = function() {};
    // TODO: Check how to make it so when this utility is used, we just get the User sessionToken and userId as default, that way all other requests that call these methods don't have to pass those two things every time

    public static GetRequest(route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        HttpRequestUtil.doAjaxCall("GET", route, params, successFunction, errorFunction);
    }

    public static PostRequest(route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        HttpRequestUtil.doAjaxCall("POST", route, params, successFunction, errorFunction);
    }

    private static doAjaxCall(method: string, route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        $.ajax(
            route,
            {
                type: method,
                processData: true,
                data: JSON.stringify(params),
                contentType: "application/json",
                dataType: "json",
                success: successFunction,
                error: errorFunction
            }
        );
    }
}
