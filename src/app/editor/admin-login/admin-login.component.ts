import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../backend/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  password: string;
  loginError = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.adminLogin(this.password).then(res => {
      console.log(res);
      this.router.navigate(['editor/home']);
    }).catch(err => {
      console.log(err);
      this.loginError = err.message;
    })
  }

}
