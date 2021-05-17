import { Component } from '@angular/core';
import {AuthService} from './service/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isConnected = false;
  currentLang = 'fr';

  constructor(private authService: AuthService, public translate: TranslateService) {
    translate.addLangs(['en', 'es', 'fr']);
    translate.setDefaultLang('fr');

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

  switchLang(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
