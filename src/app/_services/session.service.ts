import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { CommonService } from './common.service';
import { Constants } from '../tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SessionService {

  constructor(private http: Http, private common: CommonService) { }

  isAuth() {
    try {
      return this.common.getData('user')['token'] !== null;
    }catch ( err ) {
      this.common.setData('user', { 'token': null });
      return false;
    }
  }

  login(user, callback) {
    const headers = new Headers({'App-Key': Constants.APP_KEY });
    const params = this.common.paramsBuilder(user);
    this.http.get(Constants.URLS.api + Constants.URLS.login + params, { headers: headers })
      .toPromise()
      .then((data) => {
        data = data.json();
        if (data['success']) {
          data['user']['token'] = data['token'];
          this.common.setData('user', data['user']);
          callback({success: true});
        }else {
          callback(data);
        }
    });
  }

  register(user, domain, callback) {
    const headers = new Headers({'App-Key': Constants.APP_KEY });
    const params = this.common.paramsBuilder(Object.assign(user, {domain: domain}));
    this.http.get(Constants.URLS.api + Constants.URLS.register + params, { headers: headers })
      .toPromise()
      .then((data) => {
        data = data.json();
        if (data['success']) {
          callback(data['user']);
        }else {
          callback(data);
        }
    });
  }
}
