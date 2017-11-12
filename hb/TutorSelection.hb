<ul class="collapsible z-depth-3" data-collapsible="expandable">
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
            <button class="btn waves-effect waves-light TutorSelection-bookTutorButton col s3" type="submit"
                    data-tutor_index="{{@index}}">Book This Tutor
                <i class="material-icons right">contact_mail</i>
            </button>
        </div>
        <div class="collapsible-body">
            {{#if_all this._instructor this._grade}}
                <span><b>Grade:</b> {{this._grade}}<br></span>
                <span><b>Instructor:</b> {{this._instructor}}<br></span>
            {{/if_all}}
            <span><b>Past Experience:</b> {{this._pastExperience}}<br></span>
            <span><b>Other Notes:</b> {{this._notes}}<br></span>
            <span><b>Hourly Wage:</b> ${{this.hourlyRate}}<br></span>
        </div>
    </li>
    {{/each}}
</ul>
