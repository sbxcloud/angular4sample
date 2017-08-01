import { Component } from '@angular/core';
import { SessionService } from './_services/session.service';
import { Constants } from './tools';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private session: SessionService) {
    // session.login({email: 'alexander@sbxcloud.com', password: 'a10457172912'}, (response) => {
      // console.log(response);
    // });
  }
}
