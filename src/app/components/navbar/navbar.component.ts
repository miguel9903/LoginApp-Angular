import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../../services/auth-firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor( private authService: AuthFirebaseService,
               private router: Router ) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

}
