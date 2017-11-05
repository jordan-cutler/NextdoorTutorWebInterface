<div class="z-depth-5 collection with-header">
    <div class="collection-header">
        <h4>Select the course you would like to tutor</h4>
    </div>

    {{#each courses}}
        <a href="#" class="collection-item">{{this.courseNumber}} {{this.title}}</a>
    {{/each}}
</div>