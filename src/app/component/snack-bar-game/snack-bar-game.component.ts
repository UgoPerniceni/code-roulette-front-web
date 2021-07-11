import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-game',
  templateUrl: './snack-bar-game.component.html',
  styleUrls: ['./snack-bar-game.component.css']
})
export class SnackBarGameComponent {

  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarGameComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
