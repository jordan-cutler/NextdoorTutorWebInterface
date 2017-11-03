<ul class="collection with-header">
    <li class="collection-header">
        <h4>Tutors are available for the following courses</h4>
    </li>

    {{#each courses}}
    <li>
        <a href="#!" class="collection-item">{{this.courseNumber}}</a>
    </li>
    {{/each}}
</ul>