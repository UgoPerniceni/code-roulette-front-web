import { Component } from '@angular/core';
import {AuthService} from './service/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';
import {Role} from './enum/Role';
import {UserService} from './service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sideBarOpen = true;

  constructor() {}

  sideBarToggler(): void {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
