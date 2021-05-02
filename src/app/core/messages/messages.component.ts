import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  inboxMessages: Message[];
  selectedUserName: string;

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.getInbox()
  }
  getInbox() {
    this.messagesService.getInbox().subscribe(res => {
      this.inboxMessages = res;
    })
  }
  onSelectUser(message: Message) {
    this.selectedUserName = message.displayName // For changing card bg color. Also for fetching messages
    this.messagesService.sidebarUserNameSelected.next(this.selectedUserName);
  }

}
