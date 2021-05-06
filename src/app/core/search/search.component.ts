import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search_params = ['username', 'name', 'email', 'phone']
  users: Partial<User>[] = [];

  error_message: string = null;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  onUserSelect(user: Partial<User>) {
    this.userService.sidebarUserSelected.next(user);
  }
  onSubmit(form: NgForm) {
    const params = {
      query: form.value.query.trim(),
      searchBy: form.value.searchBy.trim()
    };
    this.userService.findUsers(params).subscribe((res: Partial<User>) => {
      this.users = [];
      this.users.push(res);
      this.error_message = null;
    }, err => {
      this.error_message = err.error;
    })
  }

}
