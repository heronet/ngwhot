import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss']
})
export class SearchDetailComponent implements OnInit {
  user: Partial<User> = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.sidebarUserSelected.subscribe(user => {
      this.user = user;
    })
  }

}
