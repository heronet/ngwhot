import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = environment.BASE_URL;
  sidebarUserSelected = new Subject<Partial<User>>();
  
  constructor(private http: HttpClient) { }

  findUsers(data: {query: string, searchBy: string}) {
    return this.http.get(`${this.BASE_URL}/users?searchBy=${data.searchBy}&query=${data.query}`);
  }
}
