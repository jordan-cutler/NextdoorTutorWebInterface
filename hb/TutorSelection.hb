<ul class="collapsible z-depth-3" data-collapsible="expandable">
    {{#each tutors}}
        <li>
            <div class="row collapsible-header valign-wrapper">
                <!-- Preloader for image -->
                <div class="preloader-wrapper big active TutorSelection-preloader">
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
                <img class="TutorSelection-profileImg col s2" src="#" alt="No profile picture"
                     data-tutor_id="{{this.userId}}">
                <div class="col s7">
                    <span>{{this.name}}</span>
                </div>
                <button id="TutorSelection-bookTutorButton" class="btn tooltipped"
                        data-clipboard-text="{{this.email}}" data-position="top" data-delay="50"
                        data-tooltip="Contact them at {{this.email}}">
                    Book Tutor <i class="material-icons right">contact_mail</i>
                </button>
            </div>
            <div class="collapsible-body">
                {{#if_all this.instructor this.grade}}
                    <span><b>Grade:</b> {{this.grade}}<br></span>
                    <span><b>Instructor:</b> {{this.instructor}}<br></span>
                {{/if_all}}
                {{#if this.pastExperience}}
                    <span><b>Past Experience:</b> {{this.pastExperience}}<br></span>
                {{/if}}
                {{#if this.notes}}
                    <span><b>Other Notes:</b> {{this.notes}}<br></span>
                {{/if}}
                {{#if this.major}}
                    <span><b>Major: </b> {{this.major}}<br></span>
                {{/if}}
                <span><b>Hourly Wage:</b> ${{this.hourlyRate}}<br></span>
                <span><b>Contact:</b> {{this.email}}<br></span>
            </div>
        </li>
    {{/each}}
</ul>
