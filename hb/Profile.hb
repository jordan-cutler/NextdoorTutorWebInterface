<!--TODO(kyle): make profile page look nice and include basic info / what classes they are tutoring
Can probably get some ideas from here: http://demo.geekslabs.com/materialize/v2.3/layout03/user-profile-page.html
-->
<!--
Data Expected as:
{
    user: User,
    courses: Course[],
    endorsements: Endorsement[],
    rating: Rating
}
-->
<!-- BEGIN BASIC INFO + ENDORSEMENTS -->
<div class="row">
    <!-- BEGIN BASIC INFO -->
    <div class="col s8">
        <div class="card blue-grey lighten-1 horizontal">
            <div class="card-image">
                <img class="responsive-img" id="Profile-Photo" src="{{profilePhotoUrl}}" alt="Profile Photo"/>
                <div class="row">
                    <div class="col s12 left-align">
                        Contact: {{user._email}}
                    </div>
                </div>
                <!--<i class="large material-icons col s2">account_circle</i>-->
            </div>
            <div class="card-stacked">
                <div class="card-content row">
                    <div class="row">
                        <span class="card-title col s6">{{user._userName}}</span>
                        <a class="waves-effect waves-light btn modal-trigger right-align"
                           href="#Profile-UploadPictureModal">Upload Picture</a>
                    </div>
                    <div class="row">
                        <div class="col s12 center">
                            <p>{{#if user._bio}}
                                <br/>Bio: {{user._bio}}
                            {{else}}
                                <br/>We don't know much about this person. Pressure them into giving us their life
                                story!
                            {{/if}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> <!-- END BASIC INFO -->

    <!-- BEGIN ENDORSEMENTS -->
    <div class="col s4">
        <div class="col s12">
            <div class="card green lighten-3">
                <div class="card-content row">
                    <span class="card-title col s12">{{rating._averageRating}}</span>
                    <!-- BEGIN LIST OF ENDORSEMENTS -->
                    {{#each endorsements}}
                        <div class="row">
                            <div class="col s12">
                                <p>{{this._userName}}: {{this._endorsement}}</p>
                            </div>
                        </div>
                    {{/each}} <!-- END LIST OF ENDORSEMENTS -->

                    <!-- BEGIN IF NO ENDORSEMENTS -->
                    {{#unless endorsements}}
                        <div class="row">
                            <div class="col s12">
                                <div class="card">
                                    <div class="card-content center-align">
                                        <p>You do not have any endorsements... yet!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {{/unless}} <!-- END IF NO ENDORSEMENTS -->
                </div>
            </div>
        </div> <!-- END ENDORSEMENTS -->
    </div>
</div> <!-- END BASIC INFO + ENDORSEMENTS -->


<!-- BEGIN LIST OF COURSES PERSON IS TUTORING -->
{{#each courses}}
    <div class="row">
        <div class="col s2">
            <div class="card red lighten-2">
                <div class="card-content">
                    <p>|</p>
                </div>
            </div>
        </div>
        <div class="col s8">
            <div class="card">
                <a href="#" class="collection-item CoursesWithTutors-clickToGoToTutorSelection"
                   data-course_number="{{this.courseNumber}}">
                    {{this.courseNumber}} {{this.title}}
                </a>
                <div id="Profile-Book-Tutor-Action" class="card-action">
                    <a href="#">Book This Tutor</a>
                </div>
            </div>
        </div>
        <div class="col s2">
            <div class="card red lighten-2">
                <div class="card-content">
                    <p class="right-align">|</p>
                </div>
            </div>
        </div>
    </div>
{{/each}} <!-- END LIST OF COURSES PERSON IS TUTORING -->

<!-- BEGIN IF PERSON IS NOT TUTORING ANY COURSES -->
{{#unless courses}}
    <div class="row">
        <div class="col s2">
            <div class="card red lighten-2">
                <div class="card-content">
                    <p>|</p>
                </div>
            </div>
        </div>
        <div class="col s8">
            <div class="card">
                <div class="card-content center-align">
                    <p>You are not tutoring any classes... yet!</p>
                </div>
            </div>
        </div>
        <div class="col s2">
            <div class="card red lighten-2">
                <div class="card-content">
                    <p class="right-align">|</p>
                </div>
            </div>
        </div>
    </div>
{{/unless}} <!-- END IF PERSON IS NOT TUTORING ANY COURSES -->

<div id="Profile-UploadPictureModal" class="modal">
    <div class="modal-content">
        <h4>Upload Profile Picture</h4>
        <div class="row">
            <form class="col s12">
                <label>Maximum file upload size 5MB.</label>
                <div class="file-field input-field">
                    <div class="row">
                        <div class="col s12">
                            <div class="btn">
                                <span>Upload Profile Picture</span>
                                <input id="Profile-FileUploadInput" type="file"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text"/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<!--
                        <div class="row">
                            <form class="col s12">
                                <label>Maximum file upload size 5MB.</label>
                                <div class="file-field input-field">
                                    <div class="row">
                                        <div class="col s12">
                                            <div class="btn">
                                                <span>Upload Profile Picture</span>
                                                <input type="file"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s12">
                                            <div class="file-path-wrapper">
                                                <input class="file-path validate" type="text"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
-->