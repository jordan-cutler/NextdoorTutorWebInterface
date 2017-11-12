<div class="card white">
    <div class="card-content black-text">
        <div class="row">
            <div class="col s12">
                <h4 class="card-title condensed light">Fill out your Tutor Profile</h4>
            </div>
        </div>

        <div class="row">

        </div>
        <form name="TutorApplication-form" class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <select id="TutorApplication-course">
                        <option value="" disabled selected>N/A</option>
                        {{#each courses}}
                            <option value="">{{this._courseNumber}}</option>
                        {{/each}}
                    </select>
                    <label for="TutorApplication-course">Course to tutor</label>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    <label for="hourlyRate">Hourly Rate</label>
                </div>
                <div class="range-field col s11">
                    <input id="hourlyRate" type="range" value="20" min="0" max="50"
                           oninput="hourlyRateOutput.value = '$' + hourlyRate.value + '/hr'"/>
                </div>
                <div class="col s1">
                    <output id="hourlyRateOutput">$20/hr</output>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    <input type="checkbox" id="TutorApplication-hasTakenCourseSwitch" checked="checked" disabled="disabled" />
                    <label for="TutorApplication-hasTakenCourseSwitch">Have taken course before</label>
                </div>
            </div>

            <div id="TutorApplication-gradeRow" class="row">
                <div class="input-field col s12">
                    <select id="TutorApplication-grade">
                        <!--<option value="" disabled selected>Haven't Taken</option>-->
                        <option value="1" selected>A</option>
                        <option value="2">A-</option>
                        <option value="3">B+</option>
                        <option value="4">B</option>
                        <option value="5">B-</option>
                        <option value="6">C+</option>
                        <option value="7">C</option>
                        <option value="8">C-</option>
                    </select>
                    <label for="TutorApplication-grade">Your letter grade</label>
                </div>
            </div>

            <div id="TutorApplication-instructorRow" class="row">
                <div class="input-field col s12">
                    <input id="TutorApplication-instructor" type="text" class="character-count validate"
                           data-length="141" maxlength="141">
                    <label for="TutorApplication-instructor">Instructor</label>
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <input id="TutorApplication-pastExperience" type="text" class="validate character-count"
                           data-length="141" maxlength="141"/>
                    <label for="TutorApplication-pasExperience">Past Experience</label>
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <input id="TutorApplication-notes" type="text" class="validate character-count"
                           data-length="141" maxlength="141">
                    <label for="TutorApplication-notes">Other notes</label>
                </div>
            </div>

            <div class="row">
                <div class="col s3 offset-s9">
                    <button id="TutorApplication-submit" class="btn waves-effect waves-light orange" type="submit"
                            name="action">
                        Submit <i class="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
