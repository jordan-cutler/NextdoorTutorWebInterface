/// <reference path="HttpRequestUtil.ts" />
/// <reference path="ImageUtil.ts" />

class Profile {
    private static readonly NAME = "Profile";
    private static readonly SENDPROFILEPICTUREROUTE = "/api/drive/upload/profilePhoto";
    private static readonly GETCOURSESUSERISTUTORINGROUTE = "/api/courses/tutoring";

    public static init() {
        HttpRequestUtil.GetRequest(Profile.GETCOURSESUSERISTUTORINGROUTE + "/" + User.userId(),
            HttpRequestUtil.getSessionInfoJson(), Profile.onSuccessfulRetrievalOfCoursesUserIsTutoring,
            function(data) { console.log("failed to retrieve courses user is tutoring")}
        );
    }

    private static onSuccessfulRetrievalOfCoursesUserIsTutoring(data: any) {
        let coursesUserIsTutoring: Course[] = Course.CourseJsonArrayToCourseModelArray(data);
        let profilePhotoUrl: string = "";
        // Only make the request to get the url if we know they have a picture
        if (User.profilePhotoId() != null && User.profilePhotoId() != "") {
            profilePhotoUrl = ImageUtil.getNewProfilePhotoUrlForCurrentUser(User.userId(), User.sessionToken());
        }
        $("#indexMain").html(Handlebars.templates[Profile.NAME + ".hb"]({
            user: User.getUser(),
            profilePhotoUrl: profilePhotoUrl,
            courses: coursesUserIsTutoring
        }));
        $('.modal').modal();
        $("#" + Profile.NAME + "-FileUploadInput").change(Profile.onProfilePhotoUploadChange);
        //TODO: Allow user to remove themselves from tutoring for a class
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
            headers: {"Authorization": User.sessionToken()},
            // TODO: Add success/error functions
            success: Profile.onSuccessfulProfilePhotoUpload,
            error: HttpRequestUtil.EMPTYFUNCTION
        });
        $("#" + Profile.NAME + "-UploadPictureModal").modal('close');
    }

    private static onSuccessfulProfilePhotoUpload(data: any) {
        $("#" + Profile.NAME + "-Photo").attr('src', ImageUtil.getNewProfilePhotoUrlForCurrentUser(User.userId(), User.sessionToken()));
    }
}