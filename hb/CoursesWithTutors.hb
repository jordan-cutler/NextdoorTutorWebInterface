<div class="collection with-header">
    <div class="collection-header">
        <h4>Tutors are available for the following courses</h4>
    </div>

    {{#each courses}}
        <a href="#" class="collection-item">{{this.courseNumber}}</a>
    {{/each}}
</div>