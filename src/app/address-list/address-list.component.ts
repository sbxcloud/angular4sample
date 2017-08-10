import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { SessionService } from '../_services/session.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { Constants } from '../tools';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  addresses = [];
  isLoading: boolean;
  address = {address: '', phone: null, neighborhood: '', comments: ''};

  constructor(private session: SessionService, private router: Router, private common: CommonService, private alertify: AlertifyService) {
    if (!session.isAuth()) {
      router.navigateByUrl('login');
    }
  }

  ngOnInit() {
    this.isLoading = true;
    const query = new this.common.queryBuilder()
                            .setDomain(Constants.CURRENT_DOMAIN)
                            .setModel('address')
                            .setPageSize(20)
                            .compile();

    this.common.query(Constants.URLS.find, query).subscribe((data) => {
      data = data.json();
      if (data['success']) {
        this.addresses = data['results'];
      }
      this.isLoading = false;
    });
  }

  delete(address) {
    this.alertify.confirm(`¿Estas seguro de eliminar la direccion ${address.address}?`, (res) => {
      if (res) {
        const query = new this.common.queryBuilder()
                .setDomain(Constants.CURRENT_DOMAIN)
                .setModel('address')
                .whereWithKeys([address._KEY])
                .compile();

        this.common.query(Constants.URLS.delete, query).subscribe((data) => {
          data = data.json();
          if (data['success']) {
            this.ngOnInit();
            this.alertify.success('Eliminado exitosamente.')
          }else {
            this.alertify.error('Error');
          }
        });
      }
    })
  }

  edit(address) {
    this.address = address;
  }

  newAddress() {
    delete this.address['_META'];
    const query = new this.common.queryBuilder()
                .setDomain(Constants.CURRENT_DOMAIN)
                .setModel('address')
                .addObject(this.address)
                .compile();

    const url = this.address.hasOwnProperty('_KEY') ? Constants.URLS.update : Constants.URLS.row;

    this.common.query(url, query).subscribe((data) => {
      data = data.json();
      if (data['success']) {
        this.ngOnInit();
        this.cancel();
      }else {
        this.alertify.error('Error.');
      }
    });
  }

  cancel() {
    this.address = {address: '', phone: null, neighborhood: '', comments: ''};
  }
}
