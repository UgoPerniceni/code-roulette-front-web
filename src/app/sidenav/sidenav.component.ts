import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {Role} from '../enum/Role';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  isConnected = false;
  isAdmin = false;
  constructor(private authService: AuthService, private userService: UserService) {
    authService.currentSession.subscribe(response => {
      if (response.token){
        this.isConnected = true;

        this.userService.getCurrentUser().subscribe((user) => {
          if (user.role === Role.Admin){
            this.isAdmin = true;
          }

          console.log('is Admin -> ' + this.isAdmin);
        });

      } else {
        this.isConnected = false;
      }

      console.log('is Connected -> ' + this.isConnected);
    });
  }
}
