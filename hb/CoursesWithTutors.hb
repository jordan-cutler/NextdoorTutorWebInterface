<div class="z-depth-5 collection with-header">
    <div class="collection-header">
        <h4>Tutors are available for the following courses</h4>
    </div>

    {{#each courses}}
        <a href="#" class="collection-item CoursesWithTutors-clickToGoToTutorSelection" data-course_number="{{this.courseNumber}}">
            {{this.courseNumber}} {{this.title}}
        </a>
    {{/each}}
</div>