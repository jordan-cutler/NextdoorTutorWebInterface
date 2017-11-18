<!-- BEGIN BASIC INFO -->
<div class="row">
    <!-- BEGIN BASIC INFO -->
    <div class="col s12">
        <div class="z-depth-3 card white horizontal">
            <div class="card-image col s12 m4 valign-wrapper">

                <!--
                 The below example is taken from here: https://jsfiddle.net/Venugopal/e0u4sow1/1/
                 Other Examples:
                 http://jsfiddle.net/6Mt3Q/
                 https://codepen.io/felicia/pen/qKhJt
                 -->
                <div id="Profile-preloader" class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-red-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div><div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                    </div>
                </div>
                <div id="Profile-profileImageContainer" class="media">
                    <a id="Profile-uploadPictureLink" href="#">
                        {{#if profilePhotoRoute}}
                            <img id="Profile-profilePhoto" alt="Failed to load profile picture" class="media__image" src="{{profilePhotoRoute}}"/>
                        {{else}}
                            <i class="large material-icons col s2">account_circle</i>
                        {{/if}}
                    <div class="media__body">
                        <h6>Upload Profile Picture</h6>
                    </div>
                    </a>
                </div>
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <h3 class="card-title">{{user._userName}}</h3>
                    <div class="row">
                        <div class="col s12">
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
                <div class="card-action">
                    <a id="Profile-emailContact" href="#" data-clipboard-text="{{user._email}}">
                        <b><u>Contact:</u></b> {{user._email}}
                    </a>
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
<input id="Profile-fileUploadInput" type="file"/>