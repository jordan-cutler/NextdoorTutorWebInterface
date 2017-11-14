<div id="EditCourseModal-courseEditModal" class="modal">
    <div class="modal-content">
        <h4 class="condensed light">Edit your {{tutor._courseNumber}} information</h4>
        <div class="row">
            <div class="col s12">
                <label for="hourlyRate">Hourly Rate</label>
            </div>
            <div class="range-field col s11">
                <input id="hourlyRate" type="range" value="{{tutor._hourlyRate}}" min="0" max="50"
                       oninput="hourlyRateOutput.value = '$' + hourlyRate.value + '/hr'"/>
            </div>
            <div class="col s1">
                <output id="hourlyRateOutput">${{tutor._hourlyRate}}/hr</output>
            </div>
        </div>

        <div class="row">
            <div class="input-field col s12">
                <input id="EditCourseModal-pastExperience" type="text" class="validate character-count"
                       data-length="141" maxlength="141" value="{{tutor._pastExperience}}"/>
                <label for="EditCourseModal-pasExperience">Past Experience</label>
            </div>
        </div>

        <div class="row">
            <div class="input-field col s12">
                <input id="EditCourseModal-notes" type="text" class="validate character-count"
                       data-length="141" maxlength="141" value="{{tutor._notes}}">
                <label for="EditCourseModal-notes">Other notes</label>
            </div>
        </div>

        <div class="row">

            <div class="col s6">
                <button id="EditCourseModal-stopTutoring" class="btn waves-effect waves-light red center" type="submit" name="action">
                    Stop Tutoring Course <i class="material-icons left">clear</i>
                </button>
            </div>

            <!-- TODO: This does not align properly on the right side-->
            <div class="col s6">
                <button id="EditCourseModal-submit" class="btn waves-effect waves-light orange center" type="submit"
                        name="action">
                    Apply Changes <i class="material-icons right">done</i>
                </button>
            </div>

            <!--<div class="col s5 offset-s5">-->
                <!---->
            <!--</div>-->
        </div>
    </div>
</div>