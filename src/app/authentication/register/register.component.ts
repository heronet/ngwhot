import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email_valid = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    const email = form.value.email.trim().toLowerCase()
    const username: string = form.value.username.trim()
    const password = form.value.password.trim()

    for(let i = 0; i != email.length; ++i) {
      if(email[i] === '@')
        this.email_valid = true;
    }
    if(!this.email_valid) return;
    
    const user: Partial<User> = {
      email,
      username,
      password
    };

    this.authService.register(user).subscribe(res => {
    })
  }

}
