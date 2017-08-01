import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { LocalStorageService } from './local-storage.service';
import { Constants } from '../tools';
import QueryBuilder from 'sbx-querybuilder/index';

@Injectable()
export class CommonService {
  queryBuilder = QueryBuilder;

  constructor(private http: Http, private storage: LocalStorageService) { }

  paramsBuilder(obj) {
    let params = '?';
    Object.keys(obj).forEach(key => {
      params = params + encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) + '&';
    });
    params = params.substring(0, params.length - 1);
    return params;
  }

  getHeaders() {
    return { 'Authorization': 'Bearer ' + this.storage.getData('user').token, 'App-Key': Constants.APP_KEY };
  }

  query(urlRequest, send_query) {
    const headers = new Headers(this.getHeaders());
    const options = new RequestOptions({ headers: headers });
    return this.http.post(Constants.URLS.api + urlRequest, send_query, options);
  }
}
