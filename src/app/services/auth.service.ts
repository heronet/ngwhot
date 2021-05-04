import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { AuthData } from '../models/AuthData';
import { ReplaySubject } from 'rxjs';
import { SignalrService } from './signalr.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = environment.BASE_URL;
  private authenticatedUserSource = new ReplaySubject<AuthData>(1); // Keeps track of user Authentication Status
  authenticatedUser$ = this.authenticatedUserSource.asObservable();

  constructor(private http: HttpClient, private signalr: SignalrService) { }

  login(login_creds: Partial<User>) {
    return this.http.post(`${this.BASE_URL}/account/login`, login_creds).pipe(
      map((authData: AuthData) => {
        if(authData) {
          localStorage.setItem('authData', JSON.stringify(authData));
          this.setUser(authData);
        }
      })
    )
  }
  logout() {
    localStorage.removeItem('authData');
    this.signalr.destroyHubConnection();
    this.authenticatedUserSource.next(null);
  }
  register(register_creds: Partial<User>) {
    return this.http.post(`${this.BASE_URL}/account/register`, register_creds).pipe(
      map((authData: AuthData) => {
        if(authData) {
          localStorage.setItem('authData', JSON.stringify(authData));
          this.setUser(authData);
        }
      })
    )
  }
  
  setUser(authData: AuthData) {
    this.signalr.createHubConnection(authData);
    this.authenticatedUserSource.next(authData);
  }
}
