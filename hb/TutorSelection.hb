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
            <button id="TutorSelection-bookTutorButton" class="btn tooltipped"
                    data-clipboard-text="{{this._email}}" data-position="top" data-delay="50"
                    data-tooltip="Contact them at {{this._email}}">
                Book Tutor <i class="material-icons right">contact_mail</i>
            </button>
        </div>
        <div class="collapsible-body">
            {{#if_all this._instructor this._grade}}
                <span><b>Grade:</b> {{this._grade}}<br></span>
                <span><b>Instructor:</b> {{this._instructor}}<br></span>
            {{/if_all}}
            <span><b>Past Experience:</b> {{this._pastExperience}}<br></span>
            <span><b>Other Notes:</b> {{this._notes}}<br></span>
            <span><b>Hourly Wage:</b> ${{this._hourlyRate}}<br></span>
            <span><b>Contact:</b> {{this._email}}<br></span>
        </div>
    </li>
    {{/each}}
</ul>
