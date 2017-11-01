<!-- Materialize navbars here http://materializecss.com/navbar.html -->
<nav id="Navbar">
    <div class="nav-wrapper">
        <!-- TODO(kyle): Change NextdoorTutor to logo. I think there's a navbar setup at the link at the top of the page that allows you to include a logo -->
        <a href="#" class="brand-logo">NextdoorTutor</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
        {{#if user}}
            <!-- TODO(kyle), for some reason, it displays the name on the line below Welcome. But we want welcome, name to be on same line. -->
            <li><h5>Welcome, <a href="#">{{user._userName}}</a></h5></li>
            <li><a id="Navbar-signOutButton" class="waves-effect waves-light btn">Sign Out</a></li>
        {{/if}}
        </ul>
    </div>
</nav>