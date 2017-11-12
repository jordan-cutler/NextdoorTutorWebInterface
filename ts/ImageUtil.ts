class ImageUtil {
    private static readonly GETPROFILEPICTUREROUTE = "/api/drive/download/profilePhoto";

    // Returns a unique url so the browser doesn't cache the previous image if someone just uploaded a new one
    public static getNewProfilePhotoUrlForCurrentUser(userId: string, sessionToken: string) {
        return ImageUtil.GETPROFILEPICTUREROUTE + "/" + User.userId() +
            "?userId=" + userId + "&sessionToken=" + sessionToken + "&time=" + new Date().getTime();
    }

    // Returns a unique url so the browser doesn't cache the previous image if someone just uploaded a new one
    public static getNewProfilePhotoUrl(userId: string, sessionToken: string, askerId: string) {
        return ImageUtil.GETPROFILEPICTUREROUTE + "/" + userId +
            "?userId=" + askerId + "&sessionToken=" + sessionToken + "&time=" + new Date().getTime();
    }

    public static hideImagesUntilLoaded(preloaderClassName: string, imagesClassName: string) {
        setTimeout(function() {
            $(preloaderClassName).hide();
            $(imagesClassName).show();
        }, 1700);
    }
}
