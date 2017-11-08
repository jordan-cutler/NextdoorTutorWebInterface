<!--TODO(kyle): make profile page look nice and include basic info / what classes they are tutoring
Can probably get some ideas from here: http://demo.geekslabs.com/materialize/v2.3/layout03/user-profile-page.html
-->

<div class="row">
    <div class="col s8">
        <div class="card blue-grey lighten-1 horizontal">
            <div class="card-image">
                <!--<img class="responsive-img" id="Profile-Photo" src={{user._profilePhotoUrl}} alt="Profile Photo"/>-->
                <i class="large material-icons col s2">account_circle</i>
            </div>
            <div class="card-stacked">
                <div class="card-content row">
                    <span class="card-title col s6">{{user._userName}}</span>
                    <p class="col s6">Contact: {{user._email}}</p>
                    <div class="col s12 center">
                        <p>{{#if has_bio}}
                            <br/>Bio: {{user._bio}}
                            {{else}}
                            <br/>We don't know much about this person. Pressure them into giving us their life story!
                            {{/if}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col s4">
        <div class="card green lighten-3">
            <div class="card-content row">
                <span class="card-title col s12">{{rating._averageRating}}</span>
                {{#if has_endorsements}}
                {{#each endorsements}}
                <div class="col s12">
                    <p>{{this._userName}}: {{this._endorsement}}</p>
                </div>
                {{/each}}
                {{else}}
                <div class="col s12">
                    <div class="card">
                        <div class="card-content center-align">
                            <p>You do not have any endorsements... yet!</p>
                        </div>
                    </div>
                </div>
                {{/if}}
            </div>
        </div>
    </div>
    {{#if has_courses}}
    {{#each courses}}
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
    {{/each}}
    {{else}}
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
    {{/if}}

</div>