import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './tools';

import { CommonService } from './_services/common.service';
import { SessionService } from './_services/session.service';
import { LocalStorageService } from './_services/local-storage.service';

import { AppComponent } from './app.component';
import { AddressListComponent } from './address-list/address-list.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    CommonService,
    LocalStorageService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
