import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  username: string;
  recipientName: string = null;
  recipientLastActive: string;
  recipienOnline: boolean;
  authStatusListener: Subscription;
  recipientNameSubscription: Subscription;
  signalRActiveSubscription: Subscription;
  activeUsers: string[] = [];

  // Search Utils
  isOnSearchMode = false;

  constructor(
    private authService: AuthService, 
    private messagesService: MessagesService, 
    private signalrService: SignalrService,
    private utilityService: UtilityService
  ) { }
  
  ngOnInit(): void {
    this.authStatusListener = this.authService.authenticatedUser$.subscribe(authData => {
      if(authData)
        this.username = authData.username;
    })
    this.recipientNameSubscription = this.messagesService.sidebarUserNameSelected.subscribe(toolbarData => {
      this.recipientName = toolbarData.name;
      this.recipientLastActive = toolbarData.lastActive;
      this.checkUserOnline();
    })
    this.signalRActiveSubscription = this.signalrService.onlineUsers.subscribe(users => {
      this.activeUsers = users;
      this.checkUserOnline();
    })
  }
  checkUserOnline() {
    for(let i = 0; i !== this.activeUsers.length; ++i) {
        if(this.activeUsers.includes(this.recipientName))
            this.recipienOnline = true;
        else
          this.recipienOnline = false;
      }
  }
  ngOnDestroy(): void {
    this.authStatusListener.unsubscribe();
    this.recipientNameSubscription.unsubscribe();
    this.signalRActiveSubscription.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
  }
  onSearchClicked() {
    // Connection can only be destroyed if it was created. Recipient name is null before that
    if(this.recipientName) {
      this.messagesService.destroyHubConnection();
      this.recipientName = null;
    }
      
    if(this.isOnSearchMode) {
      this.isOnSearchMode = false;
      this.utilityService.searchToChatSwitcher.next(null);
    } 
    else { // If not on search mode, be in search mode.
      this.isOnSearchMode = true;
      this.utilityService.searchToChatSwitcher.next("search");
    }
  }

}
