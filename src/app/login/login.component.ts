import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = { email: '', password: '' };

  constructor(private session: SessionService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
    if (this.session.isAuth()) {
      this.router.navigateByUrl('addresses');
    }
  }

  login() {
    this.session.login(this.user, (data) => {
      if (data.success) {
        this.router.navigateByUrl('addresses');
      }else {
        this.alertify.error(data.error);
      }
    });
  }

}
