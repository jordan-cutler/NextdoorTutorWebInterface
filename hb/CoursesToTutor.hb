<div class="z-depth-5 collection with-header">
    <div class="collection-header">
        <h4 class="condensed light">Select the course you would like to tutor</h4>
    </div>

    {{#each courses}}
        <a href="#" class="collection-item CoursesToTutor-clickToTutor" data-course_number="{{this.courseNumber}}">
            {{this.courseNumber}} {{this.title}}
        </a>
    {{/each}}
</div>