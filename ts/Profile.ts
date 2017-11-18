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
    private static readonly EmailContactSelector = "#" + Profile.NAME + "-emailContact";

    // Modal selectors
    private static readonly EditCourseModalSelector = "#EditCourseModal-courseEditModal";
    private static readonly StopTutoringCourseButtonSelector = "#EditCourseModal-stopTutoring";
    private static readonly ApplyChangesToCourseButtonSelector = "#EditCourseModal-applyChanges";
    private static readonly HourlyRateInputSelector = "#hourlyRate";
    private static readonly PastExperienceInputSelector = "#EditCourseModal-pastExperience";
    private static readonly NotesInputSelector = "#EditCourseModal-notes";

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
            profilePhotoRoute = ImageUtil.getNewProfilePhotoUrlForCurrentUser();
        }
        Profile.showProfile(User.getUser(), profilePhotoRoute, coursesUserIsTutoring);
        Profile.setMainEventHandlers();
    }

    private static showProfile(user: User, profilePhotoRoute: string, coursesUserIsTutoring: Course[]) {
        new Clipboard(Profile.EmailContactSelector);
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
        $(Profile.ProfilePhotoSelector).attr('src', ImageUtil.getNewProfilePhotoUrlForCurrentUser());
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
        Profile.setModalEventHandlers(tutor.courseNumber);
    }

    private static onStopTutoringCourseClick(courseNumber: string) {
        TutorApiUtil.removeCurrentUserFromCourseTutor(
            courseNumber,
            function (data: any) {
                Materialize.toast("Successfully removed you from tutoring " + courseNumber + ".", 3000);
                Profile.init();
            },
            function (data: any) {
                Materialize.toast("Failed to remove you as a tutor for the course. Try again soon.", 3000);
            }
        )
    }

    private static onApplyChangesToCourseClick(courseNumber: string, updatedHourlyRate: number, updatedPastExperience: string, updatedNotes: string) {
        TutorApiUtil.updateTutorAsCurrentUser(
            courseNumber, updatedHourlyRate, updatedPastExperience, updatedNotes,
            function(data: any) {
                $(Profile.EditCourseModalSelector).modal('close');
                Materialize.toast("Successfully edited your tutor profile for " + courseNumber, 3000);
            },
            function(data: any) {
                Materialize.toast("Failed to update your tutor profile. Try again soon.", 3000);
            }
        )
    }

    private static setModalEventHandlers(courseNumber: string) {
        $('.modal').modal();
        $('select').material_select();
        $('input.character-count').characterCounter();
        $(Profile.EditCourseModalSelector).modal('open');
        $(Profile.StopTutoringCourseButtonSelector).click(function () {
            Profile.onStopTutoringCourseClick(courseNumber);
        });
        $(Profile.ApplyChangesToCourseButtonSelector).click(function () {
            let updatedHourlyRate = Number($(Profile.HourlyRateInputSelector).val());
            let updatedPastExperience = $(Profile.PastExperienceInputSelector).val();
            let updatedNotes = $(Profile.NotesInputSelector).val();
            Profile.onApplyChangesToCourseClick(courseNumber, updatedHourlyRate, updatedPastExperience, updatedNotes);
        });
        Materialize.updateTextFields();
    }

    private static setMainEventHandlers() {
        $('.modal').modal();
        $(Profile.FileUploadInputSelector).change(Profile.onProfilePhotoUploadChange);
        $(Profile.CourseUserIsTutoringSelector).click(Profile.onCourseUserIsTutoringClick);
        $(Profile.EmailContactSelector).click(function() {
            Materialize.toast("Email copied!", 1000);
        });
    }

    private static closeUploadFileModal() {
        $(Profile.UploadPictureModalSelector).modal('close');
    }
}