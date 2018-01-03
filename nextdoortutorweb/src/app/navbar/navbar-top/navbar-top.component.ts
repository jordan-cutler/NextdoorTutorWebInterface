import { Component, Host, Input, OnInit } from '@angular/core';
import { User } from '../../shared/user/user-model/user.model';
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {

  constructor(@Host() public navbarComponent: NavbarComponent) { }

  ngOnInit() {
  }

}
