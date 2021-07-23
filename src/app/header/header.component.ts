import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {Role} from '../enum/Role';
import {SidenavComponent} from '../sidenav/sidenav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isConnected = false;
  isAdmin = false;
  currentLang = 'fr';
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

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

  toggleSidebar(): void{
    this.toggleSidebarForMe.emit();
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

