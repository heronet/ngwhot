import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  username: string;
  authStatusListener: Subscription;
  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.authStatusListener = this.authService.authenticatedUser$.subscribe(authData => {
      if(authData)
        this.username = authData.username;
    })
  }
  ngOnDestroy(): void {
    this.authStatusListener.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
  }

}
