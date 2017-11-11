<div class="z-depth-5 collection with-header">
    <div class="collection-header">
        <h4 class="condensed light">Select a tutor for {{courseNumber}}</h4>
    </div>

    {{#each tutors}}
        <a href="#" class="collection-item TutorSelection-clickToViewTutor"
           data-tutor_index="{{@index}}">
            {{this._name}} ${{this._hourlyRate}}/hr
        </a>
    {{/each}}
</div>