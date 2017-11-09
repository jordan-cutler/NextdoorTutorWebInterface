class TutorApplication {

    private static readonly NAME = "TutorApplication";
    private static readonly ADDTUTORROUTE = "/api/tutors/add";
    private static courseNum: string;

    public static init(courseNumber: string) {
        TutorApplication.courseNum = courseNumber;
        $("#indexMain").html(Handlebars.templates[TutorApplication.NAME + ".hb"]({
            courseNumber: courseNumber
        }));
        $('select').material_select();
        $('input.character-count').characterCounter();
        // TODO: Once a button is added to submit, attach it to event handler to add tutor
        $("#" + TutorApplication.NAME + "-Submit").click(TutorApplication.submitApplication);
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
        console.log("calling method properly");
        console.log(TutorApplication.courseNum);
        let userId = User.userId();
        let sessionToken = User.sessionToken();
        let hourlyRateString = ($("#hourlyRateOutput").val());
        let hourlyRate = hourlyRateString.substring(1, hourlyRateString.length - 3);    // Removes the $ and /hr from the string.
        let courseNumber = TutorApplication.courseNum;


        // Getting the grade form the dropdown
        let gradeElement = (document.getElementById("TutorApplication-grade")) as HTMLSelectElement;
        let sel = gradeElement.selectedIndex;
        let opt = gradeElement.options[sel];
        let grade = (<HTMLSelectElement>opt).text;  // grade is the plain text (A, A-, B+...)


        let instructor = (<HTMLInputElement>document.getElementById("TutorApplication-instructor")).value;
        let pastExperience = (<HTMLInputElement>document.getElementById("TutorApplication-Application-Experience")).value;
        //let pastExperience = (<HTMLInputElement>document.getElementById("TutorApplication-Experience")).value;
        let notes = (<HTMLInputElement>document.getElementById("TutorApplication-notes")).value;

//        let grade = ($(""))
        console.log(hourlyRate);
        console.log("Grade = " + grade);
        console.log("instructor = " + instructor);
        console.log("exp = " + pastExperience);
        console.log("notes = " + notes);


        let tutorData = {userId: userId, hourlyRate: hourlyRate, courseNumber: courseNumber, grade: grade, instructor: instructor, pastExperience: pastExperience, notes: notes, sessionToken: sessionToken}; // empty object for now until we can get all the data needed

        HttpRequestUtil.PostRequest(TutorApplication.ADDTUTORROUTE, tutorData,
            TutorApplication.onSubmitApplicationSuccess, TutorApplication.onSubmitApplicationError);
    }

    private static onSubmitApplicationSuccess(data: any) {
        console.log("success");
        console.log(data);
    }

    private static onSubmitApplicationError(data: any) {
        console.log("error");
        console.log(data);
    }
}