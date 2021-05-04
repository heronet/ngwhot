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
  
  messages: Message[];
  connectedUsers: String[] = [];
  constructor(private messagesService: MessagesService) { }
  
  ngOnInit(): void {
    this.recipientNameSubscription = this.messagesService.sidebarUserNameSelected.subscribe(data => {
      this.recipientName = data.name;
      this.getConversation();
      if(!this.connectedUsers.includes(data.name)) {
        this.messagesService.createHubConnection(this.recipientName);
        this.connectedUsers.push(data.name);
      }
    })
    this.newMessageArrivedSubscription = this.messagesService.newMessageArrived.subscribe(msg => {
      this.messages.push(msg);
    })
    
    
  }
  ngOnDestroy(): void {
    this.recipientNameSubscription.unsubscribe();
    this.messagesService.destroyHubConnection();
  }

  getConversation() {
    this.messagesService.getConversation(this.recipientName).subscribe(messages => {
      this.messages = messages;
    })
  }
  onSend(ngForm: NgForm) {
    if(!ngForm.value.text) {
      return;
    }
    const message: Partial<Message> = {
      text: ngForm.value.text.trim(),
      recipientname: this.recipientName
    }
    this.messagesService.sendMessage(message).then(() => 
      console.log("sent")
    );
    ngForm.resetForm();
  }

}
