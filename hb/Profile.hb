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
        <div class="card white horizontal">
            <div class="card-image col s3">
                <a class="modal-trigger" href="#Profile-UploadPictureModal">
                    <img class="responsive-img" id="Profile-Photo" src="{{profilePhotoUrl}}" alt="Profile Photo"/>
                </a>
                <div class="row center">
                    <div class="col s12">
                        <br/>
                        <!--TODO: Make it so when people click on the email, it is copied into their cmd+c or crtl+c-->
                        Contact: <span class="Profile-Underline">{{user._email}}</span>
                    </div>
                </div>
                <!--<i class="large material-icons col s2">account_circle</i>-->
            </div>
            <div class="card-stacked">
                <div class="card-content row">
                    <div class="row">
                        <h3 class="card-title col s6 offset-s1 Profile-Underline">{{user._userName}}</h3>
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
    <div class="col s8">
        <div class="z-depth-5 collection with-header">
            <div class="collection-header">
                <h4 class="condensed light">Courses you're tutoring</h4>
            </div>

            {{#each courses}}
                <a href="#" class="collection-item">
                    {{this.courseNumber}} {{this.title}}
                </a>
            {{/each}}
        </div>
    </div>

    <div class="col s4">
        <div class="card white">
            <div class="card-content row">
                <span class="card-title col s12">Endorsements</span>
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