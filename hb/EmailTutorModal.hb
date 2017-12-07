<div id="EmailTutorModal-emailTutorModal" class="modal">
    <div class="modal-content">
        <div class="row">
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="EmailTutorModal-subjectTextAreaModal" type="text" class="character-count"
                               data-length="100" maxlength="100" value="{{subject}}">
                        <label for="EmailTutorModal-subjectTextAreaModal">Subject</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12" style="width: 100%">
                        <textarea id="EmailTutorModal-messageTextAreaModal" class="character-count"
                                  data-length="255" maxlength="255" placeholder="Your message to {{tutorName}}">{{message}}</textarea>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="modal-footer">
        <a id="EmailTutorModal-sendEmailButton" href="#!" data-courseNumber="{{courseNumber}}" data-tutorEmail="{{tutorEmail}}"
           class="modal-action modal-close waves-effect waves-green btn-flat">Send</a>
    </div>
</div>