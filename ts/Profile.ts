/// <reference path="HttpRequestUtil.ts" />
/// <reference path="ImageUtil.ts" />
/// <reference path="Course.ts" />
/// <reference path="CourseApiUtil.ts" />

class Profile {
    private static readonly NAME = "Profile";

    private static readonly FileUploadInputSelector = "#" + Profile.NAME + "-fileUploadInput";
    private static readonly UploadPictureModalSelector = "#" + Profile.NAME + "-uploadPictureModal";
    private static readonly ProfilePhotoSelector = "#" + Profile.NAME + "-profilePhoto";
    private static readonly CourseUserIsTutoringSelector = "." + Profile.NAME + "-courseUserIsTutoring";

    public static init() {
        CourseApiUtil.getCoursesUserIsTutoring(
            User.userId(),
            Profile.onSuccessfulRetrievalOfCoursesUserIsTutoring,
            function (data) {
                console.log("failed to retrieve courses user is tutoring")
            }
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
        Profile.setMainEventHandlers();
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
        ImageUtil.uploadProfilePictureToServer(
            fileInput,
            Profile.onSuccessfulProfilePhotoUpload,
            // TODO: Add error function
            HttpRequestUtil.EMPTYFUNCTION
        );
        Profile.closeUploadFileModal();
    }

    private static onSuccessfulProfilePhotoUpload(data: any) {
        $(Profile.ProfilePhotoSelector).attr('src', ImageUtil.getNewProfilePhotoUrlForCurrentUser(User.userId(), User.sessionToken()));
    }

    private static onCourseUserIsTutoringClick() {
        let courseNumber = $(this).data("course_number");
        TutorApiUtil.getTutorById(
            User.userId(), courseNumber,
            Profile.loadCourseUserIsTutoringModal,
            function (data: any) {
                Materialize.toast("An error occurred when trying to gather your info on that course. Please try again a bit later.", 3000)
            }
        )
    }

    private static loadCourseUserIsTutoringModal(tutorJson: any) {
        let tutor = Tutor.TutorJsonToTutorModel(tutorJson);
        $("#indexModal").html(Handlebars.templates["EditCourseModal.hb"]({
            tutor: tutor
        }));
        $('.modal').modal();
        $('select').material_select();
        $('input.character-count').characterCounter();
        $("#EditCourseModal-courseEditModal").modal('open');
        $("#EditCourseModal-stopTutoring").click(function () {
            TutorApiUtil.removeCurrentUserFromCourseTutor(
                tutor.courseNumber,
                function (data: any) {
                    $("#EditCourseModal-courseEditModal").modal('close');
                    Materialize.toast("Successfully removed you from tutoring " + tutor.courseNumber + ".", 3000);
                    Profile.init();
                },
                function (data: any) {
                    Materialize.toast("Failed to remove you as a tutor for the course. Try again soon.", 3000);
                }
            )
        });
        $("#EditCourseModal-applyChanges").click(function () {
            let updatedHourlyRate = Number($("#hourlyRate").val());
            let updatedPastExperience = $("#EditCourseModal-pastExperience").val();
            let updatedNotes = $("#EditCourseModal-notes").val();
            TutorApiUtil.updateTutorAsCurrentUser(
                tutor.courseNumber, updatedHourlyRate, updatedPastExperience, updatedNotes,
                function(data: any) {
                    $("#EditCourseModal-courseEditModal").modal('close');
                    Materialize.toast("Successfully edited your tutor profile for " + tutor.courseNumber, 3000);
                },
                function(data: any) {
                    Materialize.toast("Failed to update your tutor profile. Try again soon.", 3000);
                }
            )
        });
        Materialize.updateTextFields();
    }

    private static setMainEventHandlers() {
        $('.modal').modal();
        $(Profile.FileUploadInputSelector).change(Profile.onProfilePhotoUploadChange);
        $(Profile.CourseUserIsTutoringSelector).click(Profile.onCourseUserIsTutoringClick);
    }

    private static closeUploadFileModal() {
        $(Profile.UploadPictureModalSelector).modal('close');
    }
}