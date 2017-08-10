import { Injectable } from '@angular/core';
import Alertify from 'alertify.js';

@Injectable()
export class AlertifyService {

  private alertify = Alertify().delay(3000).maxLogItems(1).logPosition('bottom right');

  constructor() { }

  success(msg) {
    this.alertify
      .success(msg);
  }

  error(msg) {
    if (Array.isArray(msg)) {
      this.alertify.maxLogItems(msg.length).delay(10000);
      msg.forEach(element => {
        this.alertify
          .error(element);
      });
    }else {
      this.alertify
        .error(msg);
    }
  }

  confirm(msg, callback, okBtn = 'OK', cancelBtn = 'CANCEL') {
    Alertify().okBtn(okBtn).cancelBtn(cancelBtn).confirm(msg,
      () => { callback(true); },
      () => { callback(false); });
  }
}
