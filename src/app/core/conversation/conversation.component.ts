import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy {
  recipientNameSubscription: Subscription;
  recipientName: string;
  messages: Message[];

  constructor(private messagesService: MessagesService) { }
  
  ngOnInit(): void {
    this.recipientNameSubscription = this.messagesService.sidebarUserNameSelected.subscribe(name => {
      this.recipientName = name;
      this.getConversation();
    })
  }
  ngOnDestroy(): void {
    this.recipientNameSubscription.unsubscribe();
  }

  getConversation() {
    this.messagesService.getConversation(this.recipientName).subscribe(messages => {
      this.messages = messages;
    })
  }

}
