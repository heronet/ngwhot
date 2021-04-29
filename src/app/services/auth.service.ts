import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { AuthData } from '../models/AuthData';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = environment.BASE_URL;
  private authenticatedUserSource = new ReplaySubject<AuthData>(1); // Keeps track of user Authentication Status
  authenticatedUser$ = this.authenticatedUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(login_creds: {email: string, password: string}) {
    return this.http.post(`${this.BASE_URL}/account/login`, login_creds).pipe(
      map((authData: AuthData) => {
        if(authData) {
          localStorage.setItem('authData', JSON.stringify(authData));
          this.authenticatedUserSource.next(authData)
        }
      })
    )
  }
  logout() {
    localStorage.removeItem('authData')
    this.authenticatedUserSource.next(null)
  }
  
  setUser(authData: AuthData) {
    this.authenticatedUserSource.next(authData)
  }
}
