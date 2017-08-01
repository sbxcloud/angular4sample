import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { Constants } from '../tools';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  addresses = [];

  constructor(private common: CommonService) { }

  ngOnInit() {
    const query = new this.common.queryBuilder()
                            .setDomain(Constants.CURRENT_DOMAIN)
                            .setModel('address')
                            .fetchModels(['city_id', 'zone_id'])
                            .setPageSize(20)
                            .compile();

    this.common.query(Constants.URLS.find, query).subscribe((data) => {
        data = data.json();
        if (data['success']) {
          this.addresses = data['results'];
          for (const address of this.addresses){
            address.city = data['fetched_results'].city[address.city_id];
            address.zone = data['fetched_results'].zone[address.zone_id];
          }
        }else {
        }
    });
  }

  delete() {
    
  }

  edit() {

  }

  newAddress() {

  }

  select(address) {
    console.log(address);
  }
}
