/// <reference path="HttpRequestUtil.ts" />

class Profile {
    private static readonly NAME = "Profile";
    private static readonly SENDPROFILEPICTUREROUTE = "/api/drive/upload/profilePhoto";
    private static readonly GETPROFILEPICTUREROUTE = "/api/drive/download/profilePhoto";

    public static init() {
        //TODO: Also send data about what classes you have tutored for.
        //TODO: Allow user to remove themselves from tutoring for a class
        $("#indexMain").html(Handlebars.templates[Profile.NAME + ".hb"]({
            user: User.getUser(),
            // TODO: Don't make this request if profile photo id is null
            profilePhotoRoute: Profile.GETPROFILEPICTUREROUTE + "/" + User.userId() + "?userId=" + User.userId() + "&sessionToken=" + User.sessionToken()
        }));

        $('.modal').modal();
        $("#" + Profile.NAME + "-FileUploadInput").change(Profile.onProfilePhotoUploadChange);
    }

    private static onProfilePhotoUploadChange() {
        let input: HTMLInputElement = <HTMLInputElement>document.getElementById(Profile.NAME + "-FileUploadInput");
        let fileInput: File = input.files[0];
        $.ajax({
            url: Profile.SENDPROFILEPICTUREROUTE + "/" + User.userId(),
            method: 'POST',
            data: fileInput,
            processData: false,  // tell jQuery not to process the data as a string
            contentType: fileInput.type,
            headers: { "Authorization": User.sessionToken() },
            // TODO: Add success/error functions
            success: HttpRequestUtil.EMPTYFUNCTION,
            error: HttpRequestUtil.EMPTYFUNCTION
        });
        $("#" + Profile.NAME + "-UploadPictureModal").modal('close');
    }
}