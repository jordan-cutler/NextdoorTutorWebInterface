<!-- Materialize navbars here http://materializecss.com/navbar.html -->
<nav id="Navbar">
    <div class="nav-wrapper">
        <!-- TODO(kyle): Change NextdoorTutor to logo. I think there's a navbar setup at the link at the top of the page that allows you to include a logo -->
        <a href="#" class="brand-logo">NextdoorTutor</a>
        <ul class="right hide-on-med-and-down">
        {{#if user}}
            <!-- TODO(kyle), for some reason, it displays the name on the line below Welcome. But we want welcome, name to be on same line. -->
            <li>
                <a href="#!">
                    <i class="small material-icons left">account_circle</i>{{user._userName}}
                </a>
            </li>
            <li><a id="Navbar-signOutButton" class="waves-effect waves-light btn">Sign Out</a></li>
        {{/if}}
        </ul>
    </div>
</nav>