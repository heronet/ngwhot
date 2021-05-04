import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthData } from '../models/AuthData';
import { Message } from '../models/Message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  BASE_URL = environment.BASE_URL;
  HUB_URL = environment.HUB_URL;
  private hubConnection: HubConnection;
  authData: AuthData;

  sidebarUserNameSelected = new Subject<{name: string, lastActive: string}>()
  newMessageArrived = new Subject<Message>()

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.authenticatedUser$.subscribe(data => {
      this.authData = data;
    })
  }
  getInbox() {
    return this.http.get<Message[]>(`${this.BASE_URL}/message/inbox`).pipe(
      map(messages => {
        messages.forEach(message => {
          this.setDisplayName(message);
        })
        return messages;
      })
    )
  }
  getConversation(data: {recipientName: string, skip: number}) {
    return this.http.get<Message[]>(`${this.BASE_URL}/message/${data.recipientName}?skip=${data.skip}`);
  }
  sendMessage(message: Partial<Message>) {
    // return this.http.post<Message>(`${this.BASE_URL}/message`, message); Can be used for sending message using HTTPPOST
    return this.hubConnection.invoke("SendMessage", message).catch(err => console.log(err));
  }
  createHubConnection(otherGuy: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.HUB_URL}/chat?user=${otherGuy}`, {
        accessTokenFactory: () => this.authData.token
      })
      .withAutomaticReconnect()
      .build();
    this.hubConnection.start().catch(err => {
      console.log(err);
      
    })
    this.hubConnection.on('NewMessage', mesg => {
      this.setDisplayName(mesg)
      this.newMessageArrived.next(mesg);
    })
  }
  destroyHubConnection() {
    this.hubConnection.stop().catch(err => {
      console.log(err);
      
    })
  }

  private setDisplayName(message: Message) {
    // If User is the sender
    if(message.sendername === this.authData.username) {
      message.displayName = message.recipientname // Set the displayName to the recepientName
    } else {
      message.displayName = message.sendername // Or else, Set the displayName to the senderName(who is not the user)
    }
  }
}
