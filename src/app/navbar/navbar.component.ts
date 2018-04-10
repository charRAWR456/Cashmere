import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(private authService: AuthenticationService, private router: Router){
  }

  ngOnInit() {
    //When Navbar component is initialized, User should be set to user that is authenticated from authentication service.
    this.user = this.authService.authUser();
  }

  logOut() {
    this.authService.logout().then(OnResolve => this.router.navigate['']);
  }
}
