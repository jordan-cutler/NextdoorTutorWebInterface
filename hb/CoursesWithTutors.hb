<ul class="collection with-header">
    <li class="collection-header">
        <h4>Tutors are available for the following courses</h4>
    </li>

    {{#each courses}}
    <li class="collection-item">
        <div>{{this.courseNumber}}<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div>
    </li>
    {{/each}}
</ul>