import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = { email: '', password: '' };

  constructor(private session: SessionService, private router: Router) { }

  ngOnInit() {
    console.log(this.session.isAuth());
  }

  login() {
    this.session.login(this.user, (data) => {
      if (data.success) {
        this.router.navigateByUrl('addresses');
      }else {
        this.router.navigateByUrl('addresses');
      }
    });
  }

}
