import { Component } from '@angular/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet-annuel-front-web';

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
