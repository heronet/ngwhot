import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from '../models/AuthData';

@Injectable({
  providedIn: 'root'
})
export class SignalrService { // Track online presence
  HUB_URL = environment.HUB_URL;
  private hubConnection: HubConnection;
  onlineUsers: Subject<string[]> = new Subject<string[]>();

  constructor() { }
  createHubConnection(authData: AuthData) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.HUB_URL}/active`, {
        accessTokenFactory: () => authData.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(err => {
      console.log(err);
    });

    this.hubConnection.on("GetActiveUsers", users => {
      this.onlineUsers.next(users);
    })
  }
  destroyHubConnection() {
    this.hubConnection.stop().catch(err => {
      console.log(err);
      
    })
  }
}
