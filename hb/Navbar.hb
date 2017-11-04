<!-- Materialize navbars here http://materializecss.com/navbar.html -->
<nav id="Navbar">
    <div class="nav-wrapper">
        <!-- TODO(kyle): Change NextdoorTutor to logo. I think there's a navbar setup at the link at the top of the page that allows you to include a logo -->
        <a id="Navbar-logo" href="#" class="brand-logo"><img src="assets/images/FinalLogo3.png" alt="NextdoorTutor"></a>
        <ul class="right hide-on-med-and-down">
        {{#if user}}
            <li>
                <a id="Navbar-findATutorButton" href="#">Find a tutor</a>
            </li>
            <li>
                <a id="Navbar-tutorAClassButton" href="#">Tutor a class</a>
            </li>
            <li>
                <a id="Navbar-profileButton" href="#">
                    <i class="small material-icons left">account_circle</i>{{user._userName}}
                </a>
            </li>
            <li><a id="Navbar-signOutButton">Sign Out</a></li>
        {{/if}}
        </ul>
    </div>
</nav>