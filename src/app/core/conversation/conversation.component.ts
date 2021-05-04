import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { MessagesService } from 'src/app/services/messages.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy {
  recipientNameSubscription: Subscription;
  newMessageArrivedSubscription: Subscription;
  
  recipientName: string;
  skipMessages = 0;
  takeMessages = 10;
  isButtonClickMessageLoading = false;

  messages: Message[];
  connectedUsers: String[] = [];
  constructor(private messagesService: MessagesService) { }
  
  ngOnInit(): void {
    // Listening for new user selection
    this.recipientNameSubscription = this.messagesService.sidebarUserNameSelected.subscribe(data => {
      this.recipientName = data.name; // Change recipient to new user
      this.getConversation(); // Fetch the conversation. Skip 0 messages initially.
      this.skipMessages = 0; // Reset skip counter so no message is skipped for new user.
      if(!this.connectedUsers.includes(data.name)) {
        this.messagesService.createHubConnection(this.recipientName);
        this.connectedUsers.push(data.name);
      }
    })
    this.newMessageArrivedSubscription = this.messagesService.newMessageArrived.subscribe(msg => {
      if(this.messages.length >= this.takeMessages) // We won't unshift if available messages are less than the max we take per page
        this.messages.shift();
      this.messages.push(msg);
    })
    
    
  }
  ngOnDestroy(): void {
    this.recipientNameSubscription.unsubscribe();
    this.messagesService.destroyHubConnection();
  }

  getConversation() {
    this.messagesService.getConversation({recipientName: this.recipientName, skip: this.skipMessages}).subscribe(messages => {
      if(messages) // Don't accept response if it is empty
        this.messages = messages;
        this.isButtonClickMessageLoading = false;
    })
  }
  onLoadMore() {
    this.isButtonClickMessageLoading = true;
    this.skipMessages = this.skipMessages + this.takeMessages;
    this.getConversation();
  }
  onLoadLess() {
    if(this.skipMessages >= this.takeMessages) {
      this.isButtonClickMessageLoading = true;
      this.skipMessages = this.skipMessages - this.takeMessages;
      this.getConversation();
    }
  }
  onSend(ngForm: NgForm) {
    if(!ngForm.value.text) {
      return;
    }
    // Prepare Message to send
    const message: Partial<Message> = {
      text: ngForm.value.text.trim(),
      recipientname: this.recipientName
    }
    // Check if user is not on the last page
    if(this.skipMessages >= this.takeMessages) {
      // User is not on the last page. So we need to fetch the last messages. 
      // Reset skip counter. Look below.
      this.skipMessages = 0;
      // Get conversation on new message send because user may hace clicked show older.
      this.messagesService.getConversation({recipientName: this.recipientName, skip: this.skipMessages}).subscribe(messages => {
        this.messages = messages
        this.messagesService.sendMessage(message).then(() => {
          
        });
      })
    } else { // User is on the last page. We can safely send messages without refetching conversation
      this.messagesService.sendMessage(message).then(() => {
          
      });
    }
    
    
    ngForm.resetForm();
  }

}
