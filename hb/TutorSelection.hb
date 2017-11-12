<div class="z-depth-5 collection with-header">
    <div class="collection-header">
        <h4 class="condensed light">Select a tutor for {{courseNumber}}</h4>
    </div>
</div>

<ul class="collapsible" data-collapsible="expandable">
    {{#each tutors}}
    <li>
        <div class="row collapsible-header valign-wrapper">
            <!-- Preloader for image -->
            <div class="preloader-wrapper active TutorSelection-imagePreloader">
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
            <img class="TutorSelection-profileImg col s2" src="#" alt="No profile picture" data-tutor_id="{{this._userId}}">
            <div class="col s7">
                <span>{{this._name}}</span>
            </div>
            <button class="btn waves-effect waves-light TutorSelection-clickToViewTutor col s3" type="submit"
                    data-tutor_index="{{@index}}">Book This Tutor
                <i class="material-icons right">contact_mail</i>
            </button>
        </div>
        <div class="collapsible-body">
            {{#if_all this._instructor this._grade}}
            <span>Grade: {{this._grade}}<br></span>
            <span>Instructor: {{this._instructor}}<br></span>
            {{/if_all}}
            <span>Past Experience: {{this._pastExperience}}<br></span>
            <span>Other Notes: {{this._notes}}<br></span>
            <span>Hourly Wage: ${{this.hourlyRate}}<br></span>
        </div>
    </li>
    {{/each}}
</ul>
