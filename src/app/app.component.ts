import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthData } from './models/AuthData';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router) {}
  
  userData: AuthData;
  authSubscription: Subscription;

  ngOnInit(): void {
    // Login user if credentials are present in localstorage
    this.setupUser();
    // Listen for login/ logout events. 
    this.authSubscription = this.authService.authenticatedUser$.subscribe(authData => {
      // Navigate to login screen if logged out
      if(authData == null) {
        this.router.navigateByUrl("/login")
      } else {
        this.router.navigateByUrl('/chat')
      }
    })
  }
  // Obtains localstorage data. 
  setupUser() {
    this.userData = JSON.parse(localStorage.getItem('authData')) as AuthData
    if(this.userData) {
      this.authService.setUser(this.userData)
      this.router.navigateByUrl("/chat")
    } else {
      this.router.navigateByUrl("/login")
    }
  }
  // Unsubscribe from listener
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
