import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Constants } from '../tools';
import QueryBuilder from 'sbx-querybuilder/index';

@Injectable()
export class CommonService {
  queryBuilder = QueryBuilder;

  constructor(private http: Http) { }

  paramsBuilder(obj) {
    let params = '?';
    Object.keys(obj).forEach(key => {
      params = params + encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) + '&';
    });
    return params.substring(0, params.length - 1);
  }

  getHeaders() {
    return { 'Authorization': 'Bearer ' + this.getData('user').token, 'App-Key': Constants.APP_KEY };
  }

  query(urlRequest, send_query) {
    const headers = new Headers(this.getHeaders());
    const options = new RequestOptions({ headers: headers });
    return this.http.post(Constants.URLS.api + urlRequest, send_query, options);
  }

  setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  /**
  * Take just the attributes of an object named in the second param.
  * Example:
  *  let object = {a:5,b:2,c:10};
  *  pick(object, ['a']); // {a:5}
  */
  pick(o, ...fields) {
    return fields.reduce((a, x) => {
      if (o.hasOwnProperty(x)) {
        a[x] = o[x];
      }
      return a;
    }, {});
  }

  /**
  * Sort an array by an attribute that all objects in it share.
  * Example:
  *  let array = [{a:5,b:2},{a:2,b:3},{a:3,b:6},{a:1,b:3}];
  *  sortArrayOfObjects(array, 'a'); // [{a:1,b:3},{a:2,b:3},{a:3,b:6},{a:5,b:2}]
  */
  sortArrayOfObjects(array, property) {
    return array.sort(this._dynamicSort(property));
  }

  _dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }
}
