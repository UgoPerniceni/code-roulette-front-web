import { StartGameDialogComponent } from './start-game-dialog/start-game-dialog.component';
import { GameComponent } from './../play/games/game/game.component';
import { ExercisesComponent } from './../play/exercises/exercises.component';
import { RankComponent } from './../rank/rank.component';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../model/User';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LobbyDialogComponent } from './lobby-dialog-create/lobby-dialog.component';
import { LobbyService } from '../../service/lobby.service';
import { Lobby } from '../../model/Lobby';
import { LobbyDialogJoinComponent } from './lobby-dialog-join/lobby-dialog-join.component';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  user!: User;
  lobby!: Lobby;
  buttonDisabled: boolean;

  constructor(private userService: UserService, private lobbyService: LobbyService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: User) => {
      console.log(user);
      this.user = user;

      if (this.user.lobbyId) {
        this.lobbyService.getLobby(this.user.lobbyId).subscribe((lobby: Lobby) => {
          console.log(lobby);
          this.lobby = lobby;
          this.buttonDisabled = this.lobby.users.length < 2;
        });
      }
    });
  }

  leaveLobby(): void {
    if (this.lobby) {
      this.lobbyService.leaveLobby(this.lobby.id).subscribe((data) => {
        console.log(data);
        this.buttonDisabled = this.lobby.users.length < 2;
        if (data.status === 204) {
          alert('Lobby left.');
        }
      });
    }
  }

  chooseGame(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "200px";
    dialogConfig.width = "20%";
    this.dialog.open(StartGameDialogComponent, dialogConfig);
    console.log(this.lobby.users.length);
  }
  checkButton() {
    return this.lobby.users.length > 1;
  }

  openCreateLobbyDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Create a new lobby'
    };

    const dialogRef = this.dialog.open(LobbyDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          console.log('Dialog output:', data);
          if (this.user) {
            this.lobbyService.createLobby(this.user.id, data.title).subscribe((user: User) => {
              console.log('user added in lobby : ');
              console.log(user);
              this.user = user;
              this.lobbyService.getLobby(this.user.lobbyId).subscribe((lobby) => {
                this.lobby = lobby;
                this.buttonDisabled = this.lobby.users.length < 2;
              });
            });
          }
        }
      }
    );
  }

  openJoinLobbyDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 2,
      title: 'Join a lobby'
    };

    const dialogRef = this.dialog.open(LobbyDialogJoinComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data && data.lobbyId != null) {
          console.log('Dialog output:', data);
          this.lobbyService.joinLobby(data.lobbyId).subscribe((user: User) => {
            console.log('lobby joined : ', user);
            this.user = user;
            this.buttonDisabled = this.lobby.users.length < 2;
          });
        }
      }
    );
  }
}
