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
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isConnected = false;
  isAdmin = false;
  currentLang = 'fr';

  constructor(private router: Router, private authService: AuthService, private userService: UserService, public translate: TranslateService) {
    translate.addLangs(['en', 'es', 'fr']);
    translate.setDefaultLang('fr');

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

  logout(): void {
    this.authService.logout();
    this.isConnected = false;
    this.router.navigateByUrl('/login')
      .then(() => console.log('Successfully logout.'));
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
