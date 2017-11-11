<div class="row">
    <div class="col s12">
        <div class="card blue-grey darken-1">
            <div class="card-content white-text">
                <span class="card-title">{{tutor._name}}</span>
                <h3>Email: {{tutor._email}}</h3>
                <h3>Rate: ${{tutor._hourlyRate}}/hr</h3>
                <!-- TODO FOR ALL THE BELOW FIELDS, NEED TO CHECK IF THEY EXIST. We allow people who haven't taken the class before to tutor because of AP credits-->
                <h3>Grade: {{tutor._grade}}</h3>
                <h3>Instructor: {{tutor._instructor}}</h3>
                <h3>Past Experience: {{tutor._pastExperience}}</h3>
                <h3>Other Notes: {{tutor._notes}}</h3>
                <h3>Picture: {{tutor._profilePhotoUrl}}</h3> <!-- THIS IS THE ID of the photo that we make a GET for-->
            </div>
        </div>
    </div>
</div>