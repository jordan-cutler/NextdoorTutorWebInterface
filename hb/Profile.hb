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
            <div class="card-image col s3">
                {{#if profilePhotoRoute}}
                    <!--
                     Examples:
                     The below example is taken from here: https://jsfiddle.net/Venugopal/e0u4sow1/1/
                     http://jsfiddle.net/6Mt3Q/
                     https://codepen.io/felicia/pen/qKhJt
                     -->
                    <div id="Profile-profilePhoto" class="media">
                        <a class="modal-trigger" href="#Profile-uploadPictureModal">
                            <img alt="" class="media__image" src="{{profilePhotoRoute}}" />
                            <div class="media__body">
                                <h6>Upload Profile Picture</h6>
                            </div>
                        </a>
                    </div>
                    <!--<a class="modal-trigger" href="#Profile-uploadPictureModal">-->
                        <!--<img class="responsive-img" id="Profile-profilePhoto" src="{{profilePhotoRoute}}"-->
                             <!--alt="Profile Photo"/>-->
                    <!--</a>-->
                {{else}}
                    <a class="modal-trigger" href="#Profile-uploadPictureModal">
                        <i class="large material-icons col s2">account_circle</i>
                    </a>
                {{/if}}
                <div class="row">
                    <div class="col s12">
                        <br/>
                        <!--TODO: Make it so when people click on the email, it is copied into their cmd+c or crtl+c-->
                        <b><u>Contact:</u></b>{{user._email}}
                    </div>
                </div>
            </div>
            <div class="card-stacked">
                <div class="card-content row">
                    <div class="row">
                        <h3 class="card-title col s6 offset-s1">{{user._userName}}</h3>
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
                <!--<div class="card-action">-->
                    <!--<b><u>Contact:</u></b> <u>{{user._email}}</u>-->
                <!--</div>-->
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
                <a href="#" data-course_number="{{this.courseNumber}}"
                   class="Profile-courseUserIsTutoring collection-item">
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