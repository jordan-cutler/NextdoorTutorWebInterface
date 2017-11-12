/// <reference path="HttpRequestUtil.ts" />
/// <reference path="ImageUtil.ts" />

class Profile {
    private static readonly NAME = "Profile";
    private static readonly SENDPROFILEPICTUREROUTE = "/api/drive/upload/profilePhoto";
    private static readonly GETCOURSESUSERISTUTORINGROUTE = "/api/courses/tutoring";

    private static readonly FileUploadInputSelector = "#" + Profile.NAME + "-fileUploadInput";
    private static readonly UploadPictureModalSelector = "#" + Profile.NAME + "-uploadPictureModal";
    private static readonly ProfilePhotoSelector = "#" + Profile.NAME + "-profilePhoto";

    public static init() {
        HttpRequestUtil.GetRequest(Profile.GETCOURSESUSERISTUTORINGROUTE + "/" + User.userId(),
            HttpRequestUtil.getSessionInfoJson(), Profile.onSuccessfulRetrievalOfCoursesUserIsTutoring,
            function(data) { console.log("failed to retrieve courses user is tutoring")}
        );
    }

    private static onSuccessfulRetrievalOfCoursesUserIsTutoring(data: any) {
        let coursesUserIsTutoring: Course[] = Course.CourseJsonArrayToCourseModelArray(data);
        let profilePhotoRoute: string = "";
        // Only make the request to get the url if we know they have a picture
        if (User.profilePhotoId() != null && User.profilePhotoId() != "") {
            profilePhotoRoute = ImageUtil.getNewProfilePhotoUrlForCurrentUser(User.userId(), User.sessionToken());
        }
        Profile.showProfile(User.getUser(), profilePhotoRoute, coursesUserIsTutoring);
        Profile.setEventHandlers();
        //TODO: Allow user to remove themselves from tutoring for a class
    }

    private static showProfile(user: User, profilePhotoRoute: string, coursesUserIsTutoring: Course[]) {
        $("#indexMain").html(Handlebars.templates[Profile.NAME + ".hb"]({
            user: user,
            profilePhotoRoute: profilePhotoRoute,
            courses: coursesUserIsTutoring
        }));
    }

    private static onProfilePhotoUploadChange() {
        let input: HTMLInputElement = <HTMLInputElement>document.getElementById(Profile.NAME + "-fileUploadInput");
        let fileInput: File = input.files[0];
        $.ajax({
            url: Profile.SENDPROFILEPICTUREROUTE + "/" + User.userId(),
            method: 'POST',
            data: fileInput,
            processData: false,  // tell jQuery not to process the data as a string
            contentType: fileInput.type,
            headers: {"Authorization": User.sessionToken()},
            success: Profile.onSuccessfulProfilePhotoUpload,
            // TODO: Add error function
            error: HttpRequestUtil.EMPTYFUNCTION
        });
        Profile.closeUploadFileModal();
    }

    private static onSuccessfulProfilePhotoUpload(data: any) {
        $(Profile.ProfilePhotoSelector).attr('src', ImageUtil.getNewProfilePhotoUrlForCurrentUser(User.userId(), User.sessionToken()));
    }

    private static setEventHandlers() {
        $('.modal').modal();
        $(Profile.FileUploadInputSelector).change(Profile.onProfilePhotoUploadChange);
    }

    private static closeUploadFileModal() {
        $(Profile.UploadPictureModalSelector).modal('close');
    }
}