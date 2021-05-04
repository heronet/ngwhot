import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  inboxMessages: Message[];
  selectedUserName: string;
  newMessageArrivedSubscription: Subscription;

  constructor(private messagesService: MessagesService) { }
  

  ngOnInit(): void {
    this.getInbox()
    this.newMessageArrivedSubscription = this.messagesService.newMessageArrived.subscribe(msg => {
      for(let i = 0; i !== this.inboxMessages.length; ++i) {
        if(this.inboxMessages[i].displayName === msg.displayName)
          this.inboxMessages[i] = msg;
      }
    })
    
  }
  getInbox() {
    this.messagesService.getInbox().subscribe(res => {
      this.inboxMessages = res;
    })
  }
  onSelectUser(message: Message) {
    this.selectedUserName = message.displayName // For changing card bg color. Also for fetching messages
    this.messagesService.sidebarUserNameSelected.next({name: this.selectedUserName, lastActive: message.userLastActive});
  }
  ngOnDestroy(): void {
    this.newMessageArrivedSubscription.unsubscribe();
  }

}
