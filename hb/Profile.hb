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
<!-- BEGIN BASIC INFO -->
<div class="row">
    <!-- BEGIN BASIC INFO -->
    <div class="col s12">
        <div class="z-depth-3 card white horizontal">
            <div class="card-image">
                {{#if profilePhotoRoute}}
                    <img class="responsive-img" id="Profile-profilePhoto" src="{{profilePhotoRoute}}"
                         alt="Profile Photo"/>
                {{else}}
                    <i class="large material-icons col s2">account_circle</i>
                {{/if}}
                <div class="row">
                    <div class="col s12 offset-s1">
                        <br/>
                        <b>Contact:</b> {{user._email}}
                    </div>
                </div>

            </div>
            <div class="card-stacked">
                <div class="card-content row">
                    <div class="row">
                        <h3 class="card-title col s6 offset-s1">{{user._userName}}</h3>
                        <a class="waves-effect waves-light orange btn modal-trigger right-align"
                           href="#Profile-uploadPictureModal">Upload Picture</a>
                    </div>
                    <div class="row">
                        <div class="col s12 offset-s1">
                            <br/>
                            <p>
                                {{#if user._bio}}
                                    Bio: {{user._bio}}
                                {{else}}
                                    Click here to tell everyone a bit about yourself!
                                {{/if}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> <!-- END BASIC INFO -->
</div>

<div class="row">
    <div class="col s12 m8">
        <div class="z-depth-3 collection with-header">
            <div class="collection-header">
                <h5 class="condensed light">Courses you're tutoring</h5>
            </div>

            {{#each courses}}
                <a href="#" data-course_number="{{this.courseNumber}}" class="Profile-courseUserIsTutoring collection-item">
                    {{this.courseNumber}} {{this.title}}
                </a>
            {{/each}}
        </div>
    </div>

    <div class="col s12 m4">
        <div class="z-depth-3 card white">
            <div class="card-content row">
                <span class="condensed light card-title col s12">Endorsements</span>
                <!-- BEGIN LIST OF ENDORSEMENTS -->
                {{#each endorsements}}
                    <div class="row">
                        <div class="col s12">
                            <p>{{this._userName}}: {{this._endorsement}}</p>
                        </div>
                    </div>
                {{/each}} <!-- END LIST OF ENDORSEMENTS -->
            </div>
        </div>
    </div> <!-- END ENDORSEMENTS -->
</div>
<!-- BEGIN LIST OF COURSES PERSON IS TUTORING -->

<!-- Upload Picture Modal-->
<div id="Profile-uploadPictureModal" class="modal">
    <div class="modal-content">
        <h4>Say hi to the camera!</h4>
        <div class="row">
            <form class="col s12">
                <label>Maximum file upload size 5MB.</label>
                <div class="file-field input-field">
                    <div class="row">
                        <div class="col s12">
                            <div class="btn orange">
                                <span>Upload Profile Picture</span>
                                <input id="Profile-fileUploadInput" type="file"/>
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