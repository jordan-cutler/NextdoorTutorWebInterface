/// <reference path="Tutor.ts" />
/// <reference path="ImageUtil.ts" />
/// <reference path="TutorApiUtil.ts" />

class TutorSelection {

    private static readonly NAME = "TutorSelection";

    private static tutors: Tutor[];

    private static readonly ProfileImagesSelector = "." + TutorSelection.NAME + "-profileImg";
    private static readonly BookTutorButtonSelector = "." + TutorSelection.NAME + "-bookTutorButton";
    private static readonly ImagePreloadersSelector = "." + TutorSelection.NAME + "-preloader";

    // Modal selectors
    private static readonly EmailTutorModalSelector = "#EmailTutorModal-emailTutorModal";
    private static readonly EmailTutorModalSendButtonSelector = "#EmailTutorModal-sendEmailButton";
    private static readonly EmailTutorModalSubjectSelector = "#EmailTutorModal-subjectTextAreaModal";
    private static readonly EmailTutorModalMessageSelector = "#EmailTutorModal-messageTextAreaModal";

    public static init(courseNumber: string) {
        TutorApiUtil.getTutorsForCourse(
            courseNumber,
            function (data: any) {
                TutorSelection.showTutors(data, courseNumber);
            },
            function(data: any) {
                Materialize.toast("Failed to retrieve tutors for that course. Refresh and try again.", 3000);
            }
        );
    }

    private static showTutors(data: any, courseNumber: string) {
        new Clipboard(".btn");
        TutorSelection.setTutors(Tutor.tutorJsonArrayToTutorModel(data));
        TutorSelection.handlebarsAddIfAll(); // Register handlebars function before we add the template
        $("#CoursesWithTutors-TutorList").html(Handlebars.templates[TutorSelection.NAME + ".hb"]({
            tutors: TutorSelection.getTutors(),
            courseNumber: courseNumber
        }));
        TutorSelection.setImageSrcAttributesForProfilePictures();
        ImageUtil.hideImagesUntilLoaded(TutorSelection.ImagePreloadersSelector, TutorSelection.ProfileImagesSelector);
        TutorSelection.setEventHandlers();
    }

    private static setImageSrcAttributesForProfilePictures() {
        $(TutorSelection.ProfileImagesSelector).each(function (index: number, elem: any) {
            $(elem).attr("src",
                ImageUtil.getNewProfilePhotoUrl($(elem).data("tutor_id"), UserSession.sessionToken(), UserSession.userId())
            );
        });
    }

    private static setEventHandlers() {
        $('.collapsible').collapsible();
        $('input.character-count').characterCounter();
        $('textarea.character-count').characterCounter();
        $(TutorSelection.BookTutorButtonSelector).click(TutorSelection.loadEmailTutorModal);
    }

    private static loadEmailTutorModal(event: any) {
        event.preventDefault();
        let tutorEmail = $(this).data('email');
        let tutorName: string = $(this).data('tutorname');
        let tutorFirstName = tutorName.substring(0, tutorName.indexOf(" "));
        let courseNumber = $(this).data('coursenumber');
        let subject = "NextdoorTutor - " + courseNumber;
        let defaultMessage =
            `Hi ${tutorFirstName}, \n\n` +
            `Would you meet up to tutor me for ${courseNumber}? Please email me back with a time that would work well for you. \n\n` +
            `Best,\n\n` +
            UserSession.currentUser().userName;

        $("#indexModal").html(Handlebars.templates["EmailTutorModal.hb"]({
            courseNumber: courseNumber,
            tutorEmail: tutorEmail,
            tutorName: tutorFirstName,
            message: defaultMessage,
            subject: subject
        }));
        $('.modal').modal();
        $(TutorSelection.EmailTutorModalSelector).modal('open');
        Materialize.updateTextFields();
        $(TutorSelection.EmailTutorModalSendButtonSelector).click(function() {
            let subject = $(TutorSelection.EmailTutorModalSubjectSelector).val();
            let message = $(TutorSelection.EmailTutorModalMessageSelector).val();
            TutorSelection.sendEmailToTutor(tutorEmail, courseNumber, subject, message);
        });
    }

    private static sendEmailToTutor(tutorEmail: string, courseNumber: string, subject: string, message: string) {
        TutorApiUtil.sendEmailToTutor(
            subject, message, tutorEmail, courseNumber,
            function(data: any) {
                Materialize.toast("Successfully emailed tutor. They will email you back soon if interested.", 3000);
            },
            function(data: any) {
                Materialize.toast("Failed to send email. Please try again soon.", 3000);
            }
        );
    }

    private static setTutors(tutors: Tutor[]) {
        TutorSelection.tutors = tutors;
    }

    private static getTutors() {
        return TutorSelection.tutors;
    }

    // Register handlebars helper to validate multiple fields existing
    private static handlebarsAddIfAll() {
        Handlebars.registerHelper('if_all', function(this: any) {
            let args = [].slice.apply(arguments);
            let opts = args.pop();

            let fn = opts.fn;
            for (let i = 0; i < args.length; i++) {
                if (args[i])
                    continue;
                fn = opts.inverse;
                break;
            }

            return fn(this);
        });
    }

}