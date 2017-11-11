<!-- Materialize navbars here http://materializecss.com/navbar.html -->
<nav id="Navbar">
    <div class="z-depth-4 nav-wrapper white black-text">

        <a id="Navbar-logo" href="#" class="brand-logo logo"><img src="assets/images/FinalLogo8.png" alt="NextdoorTutor"></a>
        {{#if user}}
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
            <li>
                <a class="Navbar-findATutorButton black-text" href="#">Find a tutor</a>
            </li>

            <li>
                <a class="Navbar-tutorAClassButton black-text" href="#">Tutor a course</a>
            </li>

            <li>
                <a class="Navbar-profileButton black-text" href="#">
                    <i class="small material-icons left black-text">account_circle</i>{{user._userName}}
                </a>
            </li>

            <li>
                <a class="Navbar-signOutButton black-text">Sign Out</a>
            </li>
        </ul>

        <ul class="side-nav" id="mobile-demo">
            <li>
                <a class="Navbar-findATutorButton" href="#">Find a tutor</a>
            </li>

            <li>
                <a class="Navbar-tutorAClassButton" href="#">Tutor a class</a>
            </li>

            <li>
                <a class="Navbar-profileButton" href="#">Profile</a>
            </li>

            <li>
                <a class="Navbar-signOutButton">Sign Out</a>
            </li>
        </ul>
        {{/if}}
    </div>
</nav>