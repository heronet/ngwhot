import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  server_error: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    const email = form.value.email.trim().toLowerCase()
    const password = form.value.password.trim()

    this.authService.login({email, password}).subscribe(res => {

    }, res => {
      this.server_error = res.error;
    })
  }

}
