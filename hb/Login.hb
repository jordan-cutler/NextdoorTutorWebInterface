<!--
TODO(kyle): This login hb file is set to the value of indexMain (visible in index.html). We want to show the user more than
just the google sign in button. Do we want to include the navbar or do we want to hide it? Can probably look at some other sites
welcome pages to see how they do it and do a simpler version of that.
Potentially it could be the logo centered with the google sign in button right below it.

EXAMPLE PAGE: http://demo.geekslabs.com/materialize/v2.3/layout03/user-login.html
More ideas here: https://www.uplabs.com/web
-->

<div id="Login-body" class="container">
    {{#if alert}}
        <!--{{alert}} TODO: Make some div that prints out the error message to the user in a nice location. The alert will be a string-->
    {{/if}}
    <div class="row">
        <!-- TODO(kyle): Google sign in button is currently right below Navbar. Obviously will want to move it to a nicer place on the page at some point.-->
        <div class="col s8 offset-s2">
            <div class="card blue-grey darken-1 hoverable">
                <div class="card-content white-text">
                    <img id="Login-Full-Logo" src="assets/images/FinalLogo5.png" alt="Nextdoor Tutor Logo"/>
                    <div class="g-signin2" id="googleSignIn"></div>
                </div>
                <div class="card-action">
                    <div class="row valign-wrapper">
                        <div class="col s6 center-align">
                            <a href="https://xkcd.com/501/" class="s4">Terms &amp; Conditions</a>
                        </div>
                        <div class="col s6 center-align">
                            <a href="https://www.google.com/search?q=cute+cat+picture&ie=utf-8&oe=utf-8" class="s4">Cute Cat Picture</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- TODO(kyle): When we have terms of service, use this link to see modal examples using materialize. http://demo.geekslabs.com/materialize/v2.3/layout03/ui-modals.html#
We can do something like: By signing in through Google, you are agreeing to the below TOS -->