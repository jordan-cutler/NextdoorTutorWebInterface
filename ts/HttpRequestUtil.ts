class HttpRequestUtil {

    public static readonly EMPTYFUNCTION = function() {};
    public static getSessionInfoJson() {
        return { userId: User.userId(), sessionToken: User.sessionToken() };
    }

    // TODO: Check how to make it so when this utility is used, we pass the User sessionToken and userId as default on top of everything else, that way all other requests that call these methods don't have to pass those two things every time

    public static GetRequest(route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        $.ajax({
                url: route,
                type: "GET",
                processData: true, // says to convert the "params" passed to query string
                data: params,
                contentType: "application/json",
                dataType: "json", // what we expect back from server
                success: successFunction,
                error: errorFunction
            }
        );
    }

    public static PostRequest(route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        $.ajax({
                url: route,
                type: "POST",
                processData: true,
                data: JSON.stringify(params),
                contentType: "application/json",
                dataType: "json", // what we expect back from server
                success: successFunction,
                error: errorFunction
            }
        );
    }

    public static DeleteRequest(route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        $.ajax({
            url: route,
            type: "DELETE",
            data: JSON.stringify(params),
            contentType: "application/json",
            dataType: "json",
            success: successFunction,
            error: errorFunction
        })
    }

    public static PutRequest(route: string, params: object, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        $.ajax({
            url: route,
            type: "PUT",
            data: JSON.stringify(params),
            contentType: "application/json",
            dataType: "json",
            success: successFunction,
            error: errorFunction
        })
    }
}
