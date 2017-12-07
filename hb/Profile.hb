<!-- BEGIN BASIC INFO -->
<div class="row">
    <!-- BEGIN BASIC INFO -->
    <div class="col s12">
        <div class="z-depth-3 card white center">
            <div class="card-content z-depth-4">
                <!--
                 The below example is taken from here: https://jsfiddle.net/Venugopal/e0u4sow1/1/
                 Other Examples:
                 http://jsfiddle.net/6Mt3Q/
                 https://codepen.io/felicia/pen/qKhJt
                 -->
                <div class="row">
                    <div class="col s12">
                        <a class="modal-trigger right" href="#Profile-editBioModal"><i class="material-icons">edit</i></a>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <div id="Profile-preloader" class="preloader-wrapper big active center">
                            <div class="spinner-layer spinner-red-only">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div>
                                <div class="gap-patch">
                                    <div class="circle"></div>
                                </div>
                                <div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>
                        </div>
                        <div id="Profile-profileImageContainer" class="media center">
                            <a id="Profile-uploadPictureLink" href="#">
                                {{#if profilePhotoRoute}}
                                    <img id="Profile-profilePhoto" alt="Failed to load profile picture" class="media__image z-depth-3"
                                         src="{{profilePhotoRoute}}"/>
                                {{else}}
                                    <i class="large material-icons">account_circle</i>
                                {{/if}}
                                <div class="media__body">
                                    <h6 class="mobile-hidden">Upload Profile Picture</h6>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <h3 id="Profile-userName" class="card-title center">{{user.userName}}</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <p id="Profile-bio" class="center">
                            {{#if user.bio}}
                                {{user.bio}}
                            {{else}}
                                You haven't set your bio yet!
                            {{/if}}
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <span id="Profile-major">
                            {{#if user.major}}
                                {{user.major}}
                            {{else}}
                                You haven't set your major yet!
                            {{/if}}
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <a id="Profile-emailContact" class="center" href="#" data-clipboard-text="{{user.email}}">
                            <b>Contact:</b> {{user.email}}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div> <!-- END BASIC INFO -->
</div>

<div class="row">
    <div class="col s12">
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
</div>
<!-- BEGIN LIST OF COURSES PERSON IS TUTORING -->
<input id="Profile-fileUploadInput" type="file"/>

<div id="Profile-editBioModal" class="modal">
    <div class="modal-content">
        <div class="row">
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="Profile-bioTextAreaModal" type="text" class="character-count"
                               data-length="141" maxlength="141">
                        <label for="Profile-bioTextAreaModal">Bio</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="Profile-majorTextAreaModal" type="text" class="character-count"
                               data-length="30" maxlength="30">
                        <label for="Profile-majorTextAreaModal">Major</label>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="modal-footer">
        <a id="Profile-saveBioButton" href="#!"
           class="modal-action modal-close waves-effect waves-green btn-flat">Save</a>
    </div>
</div>