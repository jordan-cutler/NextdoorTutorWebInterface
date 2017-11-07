class TutorApplication {

    private static readonly NAME = "TutorApplication";
    private static readonly ADDTUTORROUTE = "/api/tutors/add";

    public static init(courseNumber: string) {
        $("#indexMain").html(Handlebars.templates[TutorApplication.NAME + ".hb"]({
            courseNumber: courseNumber
        }));
        $('select').material_select();
        $('input.character-count').characterCounter();
        // TODO: Once a button is added to submit, attach it to event handler to add tutor

    }

    private static submitApplication() {
        /*
         Data needed:
         userId,
         hourlyRate,
         courseNumber,
         grade,
         instructor,
         pastExperience,
         notes,
         sessionToken

         We get all this data from the handlebars template. All of this is input aside from userId and sessionToken
         */
        let userId = User.userId();
        let sessionToken = User.sessionToken();
        let tutorData = {}; // empty object for now until we can get all the data needed

        HttpRequestUtil.GetRequest(TutorApplication.ADDTUTORROUTE, tutorData,
            TutorApplication.onSubmitApplicationSuccess, TutorApplication.onSubmitApplicationError);
    }

    private static onSubmitApplicationSuccess(data: any) {

    }

    private static onSubmitApplicationError(data: any) {

    }
}