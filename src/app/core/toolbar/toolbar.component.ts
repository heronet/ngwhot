import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  username: string;
  recipientName: string;
  authStatusListener: Subscription;
  recipientNameSubscription: Subscription;

  constructor(private authService: AuthService, private messagesService: MessagesService) { }
  
  ngOnInit(): void {
    this.authStatusListener = this.authService.authenticatedUser$.subscribe(authData => {
      if(authData)
        this.username = authData.username;
    })
    this.recipientNameSubscription = this.messagesService.sidebarUserNameSelected.subscribe(name => {
      this.recipientName = name;
    })
  }
  ngOnDestroy(): void {
    this.authStatusListener.unsubscribe();
    this.recipientNameSubscription.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
  }

}
