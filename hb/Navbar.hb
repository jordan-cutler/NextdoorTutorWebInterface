<nav id="Navbar" class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" 
                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <!-- Clicking the brand refreshes the page -->
            <!-- TODO: Change NextdoorTutor to logo -->
            <a class="navbar-brand" href="/">NextdoorTutor</a>

        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div id="bs-example-navbar-collapse-1" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
            {{#if user}}
                <li>
                    <h5>Welcome, {{user._userName}}</h5>
                </li>
                <li>
                    <button id="Navbar-signOutButton" type="button" class="btn btn-warning">Sign Out</button>
                </li>
            {{/if}}
            </ul>
        </div>
    </div>
</nav>