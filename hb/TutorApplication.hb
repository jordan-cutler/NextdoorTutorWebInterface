<!-- Currently given courseNumber as data. Can ask for more if you need it -->


<div class="card blue-grey darken-1">
    <div class="card-content white-text">
        <div class="row">

        </div>

        <div class="row">
            <div class="range-field col s12">
                <label for="TutorApplication-hourlyRate">Hourly Rate</label>
                <input type="range" id="TutorApplication-hourlyRate" min="0" max="50"/>
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
                <input id="TutorApplication-Application-Experience" type="text" class="validate character-count" data-length="141"/>
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

    </div>
</div>
