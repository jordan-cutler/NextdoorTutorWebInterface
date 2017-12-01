<div id="EditCourseModal-courseEditModal" class="modal">
    <div class="modal-content">
        <h4 class="condensed light">Edit your {{tutor.courseNumber}} information</h4>
        <div class="row">
            <div class="col s12">
                <label for="hourlyRate">Hourly Rate</label>
            </div>
            <div class="range-field col s10 m11">
                <input id="hourlyRate" type="range" value="{{tutor.hourlyRate}}" min="0" max="50"
                       oninput="hourlyRateOutput.value = '$' + hourlyRate.value + '/hr'"/>
            </div>
            <div class="col s2 m1">
                <output id="hourlyRateOutput">${{tutor.hourlyRate}}/hr</output>
            </div>
        </div>

        <div class="row">
            <div class="input-field col s12">
                <input id="EditCourseModal-pastExperience" type="text" class="validate character-count"
                       data-length="141" maxlength="141" value="{{tutor.pastExperience}}"/>
                <label for="EditCourseModal-pastExperience">Past Experience</label>
            </div>
        </div>

        <div class="row">
            <div class="input-field col s12">
                <input id="EditCourseModal-notes" type="text" class="validate character-count"
                       data-length="141" maxlength="141" value="{{tutor.notes}}">
                <label for="EditCourseModal-notes">Other notes</label>
            </div>
        </div>

        <div class="row">

            <div class="col s12 m6 center">
                <a id="EditCourseModal-stopTutoring" class="btn waves-effect waves-light red" type="submit" name="action">
                    Stop Tutoring Course <i class="material-icons right">clear</i>
                </a>
            </div>

            <div class="col s12 m6 center">
                <a id="EditCourseModal-applyChanges" class="btn waves-effect waves-light green" type="submit"
                        name="action">
                    Apply Changes <i class="material-icons right">done</i>
                </a>
            </div>

        </div>
    </div>
</div>