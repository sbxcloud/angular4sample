import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}
