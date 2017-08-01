import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddressListComponent } from './address-list/address-list.component';

export const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'addresses', component: AddressListComponent },
  { path: '**', redirectTo: 'login' }
]

export class Constants {
  public static APP_KEY = 'bcd45fa-abc345-777bcd-bde53-98089';
  public static CURRENT_DOMAIN = 98;
  public static URLS = { api: 'https://sbxcloud.com/api',
            register: '/user/v1/register',
            login: '/user/v1/login',
            members: '/domain/v1/member/list',
            row: '/data/v1/row',
            find: '/data/v1/row/find',
            update: '/data/v1/row/update',
            delete: '/data/v1/row/delete',
            uploadFile: '/content/v1/upload',
            notification: '/push/v1/send',
            cloudscript: '/cloudscript/v1/run' };
}

