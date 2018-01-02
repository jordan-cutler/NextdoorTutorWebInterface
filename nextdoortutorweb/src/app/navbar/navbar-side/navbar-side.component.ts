import { AfterViewInit, Component, Host, Input, OnInit, Output } from '@angular/core';
import { User } from '../../user/user.model';
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.css']
})
export class NavbarSideComponent implements AfterViewInit {
  @Input() readonly user: User;

  constructor(@Host() public navbarComponent: NavbarComponent) {
  }

  ngAfterViewInit() {
    $('.button-collapse').sideNav({
      closeOnClick: true
    });
  }

}
