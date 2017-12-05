/// <reference path="HttpRequestUtil.ts" />
/// <reference path="ImageUtil.ts" />
/// <reference path="Course.ts" />
/// <reference path="CourseApiUtil.ts" />

class Profile {
    private static readonly NAME = "Profile";

    private static readonly FileUploadInputSelector = "#" + Profile.NAME + "-fileUploadInput";
    private static readonly ProfilePhotoSelector = "#" + Profile.NAME + "-profilePhoto";
    private static readonly CourseUserIsTutoringSelector = "." + Profile.NAME + "-courseUserIsTutoring";
    private static readonly EmailContactSelector = "#" + Profile.NAME + "-emailContact";
    private static readonly UploadPictureLinkSelector = "#" + Profile.NAME + "-uploadPictureLink";
    private static readonly PreloaderSelector = "#" + Profile.NAME + "-preloader";
    private static readonly ProfileImageContainerSelector = "#" + Profile.NAME + "-profileImageContainer";
    private static readonly BioSelector = "#" + Profile.NAME + "-bio";
    private static readonly MajorSelector = "#" + Profile.NAME + "-major";

    // Modal selectors
    private static readonly EditBioInputSelector = "#" + Profile.NAME + "-bioTextAreaModal";
    private static readonly EditMajorInputSelector = "#" + Profile.NAME + "-majorTextAreaModal";
    private static readonly SaveBioButtonSelector = "#" + Profile.NAME + "-saveBioButton";
    private static readonly EditCourseModalSelector = "#EditCourseModal-courseEditModal";
    private static readonly StopTutoringCourseButtonSelector = "#EditCourseModal-stopTutoring";
    private static readonly ApplyChangesToCourseButtonSelector = "#EditCourseModal-applyChanges";
    private static readonly HourlyRateInputSelector = "#hourlyRate";
    private static readonly PastExperienceInputSelector = "#EditCourseModal-pastExperience";
    private static readonly NotesInputSelector = "#EditCourseModal-notes";

    public static init() {
        CourseApiUtil.getCoursesUserIsTutoring(
            UserSession.userId(),
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
        if (UserSession.currentUser().profilePhotoId != null && UserSession.currentUser().profilePhotoId != "") {
            profilePhotoRoute = ImageUtil.getNewProfilePhotoUrlForCurrentUser();
        }
        Profile.showProfile(UserSession.currentUser(), profilePhotoRoute, coursesUserIsTutoring);
        Profile.setMainEventHandlers();
        Profile.setEditBioTextToCurrentBio();
        Profile.setEditMajorTextToCurrentMajor();
    }

    private static showProfile(user: User, profilePhotoRoute: string, coursesUserIsTutoring: Course[]) {
        new Clipboard(Profile.EmailContactSelector);
        $("#indexMain").html(Handlebars.templates[Profile.NAME + ".hb"]({
            user: user,
            profilePhotoRoute: profilePhotoRoute,
            courses: coursesUserIsTutoring
        }));
        // Keep preloader until image is loaded as long as we have an image we need to wait for
        if (profilePhotoRoute != "") {
            ImageUtil.hideImagesUntilLoaded(Profile.PreloaderSelector, Profile.ProfileImageContainerSelector);
        }
        // remove the preloader since we're just showing them the alt image
        else {
            $(Profile.PreloaderSelector).remove();
        }
    }

    private static onProfilePhotoUploadChange() {
        let input: HTMLInputElement = <HTMLInputElement>document.getElementById(Profile.NAME + "-fileUploadInput");
        let fileInput: File | null | undefined = null;

        if (input != null && input.files != null && input.files.length >= 1) {
            fileInput = input.files![0];
            ImageUtil.uploadProfilePictureToServer(
                fileInput,
                Profile.onSuccessfulProfilePhotoUpload,
                function (data: any) {
                    Materialize.toast("Failed to upload new profile image. Try again later.", 1500);
                }
            );
        }
    }

    private static onSuccessfulProfilePhotoUpload(data: any) {
        $(Profile.ProfilePhotoSelector).attr('src', ImageUtil.getNewProfilePhotoUrlForCurrentUser());
        ImageUtil.hideImagesUntilLoaded(Profile.PreloaderSelector, Profile.ProfileImageContainerSelector);
    }

    private static onCourseUserIsTutoringClick() {
        let courseNumber = $(this).data("course_number");
        TutorApiUtil.getTutorById(
            UserSession.userId(), courseNumber,
            Profile.loadCourseUserIsTutoringModal,
            function (data: any) {
                Materialize.toast("An error occurred when trying to gather your info on that course. Please try again a bit later.", 3000)
            }
        )
    }

    private static loadCourseUserIsTutoringModal(tutorJson: any) {
        let tutor = Tutor.tutorJsonToTutorModel(tutorJson);
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
            function (data: any) {
                $(Profile.EditCourseModalSelector).modal('close');
                Materialize.toast("Successfully edited your tutor profile for " + courseNumber, 2500);
            },
            function (data: any) {
                Materialize.toast("Failed to update your tutor profile. Try again soon.", 2500);
            }
        )
    }

    private static saveProfileChanges() {
        let bio = $(Profile.EditBioInputSelector).val();
        let major = $(Profile.EditMajorInputSelector).val();
        console.log("major = " + major);
        // https://stackoverflow.com/questions/3709597/wait-until-all-jquery-ajax-requests-are-done
        $.when(
            UserApiUtil.updateBio(
            bio,
            function (data) {
                UserSession.currentUser().bio = bio;
            },
            function (data) {
                Materialize.toast("Failed to update bio. Try again soon.", 2500);
            }
        ),
            UserApiUtil.updateMajor(
                major,
                function (data) {
                    UserSession.currentUser().major = major;
                },
                function (data) {
                    Materialize.toast("Failed to update major. Try again soon.", 2500);
                }
            )
        ).done(function(response1, response2) {
            Profile.init();
        });
        //Profile.init();
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
        $('input.character-count').characterCounter();
        $(Profile.CourseUserIsTutoringSelector).click(Profile.onCourseUserIsTutoringClick);
        $(Profile.EmailContactSelector).click(function () {
            Materialize.toast("Email copied!", 1000);
        });
        $(Profile.FileUploadInputSelector).change(Profile.onProfilePhotoUploadChange);
        $(Profile.UploadPictureLinkSelector).click(function (e) {
            e.preventDefault();
            $(Profile.FileUploadInputSelector).trigger('click');
        });
        $(Profile.SaveBioButtonSelector).click(Profile.saveProfileChanges);
    }

    private static setEditBioTextToCurrentBio() {
        $(Profile.EditBioInputSelector).val(UserSession.currentUser().bio);
        Materialize.updateTextFields();
    }

    private static setEditMajorTextToCurrentMajor() {
        $(Profile.EditMajorInputSelector).val(UserSession.currentUser().major);
        Materialize.updateTextFields();
    }
}