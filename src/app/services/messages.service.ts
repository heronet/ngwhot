import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  authData: AuthData;

  sidebarUserNameSelected = new Subject<string>()

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.authenticatedUser$.subscribe(data => {
      this.authData = data;
    })
  }
  getInbox() {
    return this.http.get<Message[]>(`${this.BASE_URL}/message/inbox`).pipe(
      map(messages => {
        messages.forEach(message => {
          // If User is the sender
          if(message.sendername === this.authData.username) {
            message.displayName = message.recipientname // Set the displayName to the recepientName
          } else {
            message.displayName = message.sendername // Or else, Set the displayName to the senderName(who is not the user)
          }
        })
        return messages;
      })
    )
  }
  getConversation(recipientName: string) {
    return this.http.get<Message[]>(`${this.BASE_URL}/message/${recipientName}`);
  }
}
