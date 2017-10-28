class HttpRequestUtil {
    public static GetRequest(route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        HttpRequestUtil.doAjaxCall("GET", route, params, successFunction, errorFunction);
    }

    public static PostRequest(route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        HttpRequestUtil.doAjaxCall("POST", route, params, successFunction, errorFunction);
    }

    private static doAjaxCall(method: string, route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        $.ajax(
            Constants.APPLICATIONURL + route,
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
