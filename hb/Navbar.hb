<!-- Materialize navbars here http://materializecss.com/navbar.html -->
<nav class="white" id="Navbar">
    <div class="nav-wrapper z-depth-4 white black-text">

        <a id="Navbar-logo" href="#" class="brand-logo orange-text">
            <!--NextdoorTutor-->
            <img id="Navbar-logoImage" class="responsive-img" src="assets/images/NTLogo.png" alt="NextdoorTutor">
        </a>
        {{#if user}}
            <a href="#" data-activates="Navbar-sideNav" class="button-collapse"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
                <li>
                    <a class="Navbar-findATutorButton black-text" href="#">Find a tutor</a>
                </li>

                <li>
                    <a class="Navbar-tutorAClassButton black-text" href="#">Tutor a course</a>
                </li>

                <li>
                    <a class="Navbar-profileButton black-text" href="#">
                        <i class="small material-icons left black-text">account_circle</i>{{user.userName}}
                    </a>
                </li>

                <li>
                    <a class="Navbar-signOutButton black-text">Sign Out</a>
                </li>
            </ul>

            <ul class="side-nav" id="Navbar-sideNav">
                <li>
                    <div class="user-view">
                        <div class="background">
                            <img src="assets/images/office.jpg">
                        </div>
                        <a href="#!name"><span class="white-text name">{{user.userName}}</span></a>
                        <a href="#!email"><span class="white-text email">{{user.email}}</span></a>
                    </div>
                </li>
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