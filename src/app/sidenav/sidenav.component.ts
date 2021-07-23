import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  isConnected = false;
  constructor(private authService: AuthService) {
    authService.currentSession.subscribe(response => {
      if (response.token){
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }

      console.log('is Connected -> ' + this.isConnected);
    });

  }
  logout(): void {
    this.authService.logout();
    this.isConnected = false;

    console.log('Successfully logout.');
  }
}
