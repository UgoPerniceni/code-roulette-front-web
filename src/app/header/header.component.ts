import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isConnected = false;
  currentLang = 'fr';
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  
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

  toggleSidebar(){
    this.toggleSidebarForMe.emit();
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

