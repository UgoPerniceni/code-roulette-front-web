import { Component } from '@angular/core';

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
