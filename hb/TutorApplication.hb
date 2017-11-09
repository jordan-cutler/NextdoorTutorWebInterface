<div class="card blue-grey darken-3">
    <div class="card-content white-text">
        <div class="row">
            <div class="col s12">
                <h4 class="card-title condensed light">Fill out your Tutor Profile for {{courseNumber}}</h4>
            </div>
        </div>

        <div class="row">

        </div>
        <div class="row">
            <div class="col s12">
                <label for="hourlyRate">Hourly Rate</label>
            </div>
            <div class="row">
                <!-- TODO: Consider using ionRange instead. http://ionden.com/a/plugins/ion.rangeSlider/en.html -->
                <div class="range-field col s10">
                    <input id="hourlyRate" type="range" value="20" min="0" max="50"
                           oninput="hourlyRateOutput.value = '$' + hourlyRate.value + '/hr'"/>
                </div>
                <div class="col s2">
                    <output id="hourlyRateOutput">$20/hr</output>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="input-field col s12">
                <select id="TutorApplication-grade">
                    <option value="" disabled selected>N/A</option>
                    <option value="1">A</option>
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

        <div class="row">
            <div class="input-field col s12">
                <input id="TutorApplication-instructor" type="text" class="validate character-count" data-length="141">
                <label for="TutorApplication-instructor">Instructor</label>
            </div>
        </div>

        <div class="row">
            <div class="input-field col s12">
                <input id="TutorApplication-Application-Experience" type="text" class="validate character-count"
                       data-length="141"/>
                <label for="TutorApplication-Application-Experience">Past Experience</label>
            </div>
        </div>

        <div class="row">
            <div class="input-field col s12">
                <div class="row">
                    <input id="TutorApplication-notes" type="text" class="validate character-count" data-length="141">
                    <label for="TutorApplication-notes">Other notes</label>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col s3 offset-s9">
                <button id="TutorApplication-Submit" class="btn waves-effect waves-light" type="submit" name="action">
                    Submit
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </div>
    </div>
</div>
