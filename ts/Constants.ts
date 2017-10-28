class Constants {
    static readonly APPLICATIONURL = "";
    
    public static getUserId() {
        return localStorage.getItem("userId");
    }

    public static getUserToken() {
        return localStorage.getItem("token");
    }

    public static setUserId(userId: string) {
        localStorage.setItem("userId", userId);
    }

    public static setUserToken(token: string) {
        localStorage.setItem("token", token);
    }
}