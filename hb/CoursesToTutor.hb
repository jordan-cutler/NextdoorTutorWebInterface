<div class="collection with-header">
    <div class="collection-header">
        <h4>Select the course you would like to tutor</h4>
    </div>

    {{#each courses}}
        <a href="#" class="collection-item">{{this.courseNumber}}</a>
    {{/each}}
</div>