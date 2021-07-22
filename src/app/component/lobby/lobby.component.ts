import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/User';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LobbyDialogComponent} from './lobby-dialog-create/lobby-dialog.component';
import {LobbyService} from '../../service/lobby.service';
import {Lobby} from '../../model/Lobby';
import {LobbyDialogJoinComponent} from './lobby-dialog-join/lobby-dialog-join.component';
import {UserInGame} from '../../model/UserInGame';
import {Game} from '../../model/Game';
import {ExerciseService} from '../../service/exercise.service';
import {Exercise} from '../../model/Exercise';
import {GameService} from '../../service/game.service';
import {Utilities} from '../../utils/Utilities';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {SnackBarGameComponent} from '../snack-bar-game/snack-bar-game.component';
import {LobbySocketAPI} from '../../socket/lobbySocketAPI';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnDestroy {

  user: User;
  lobby: Lobby;

  gameTime = '25';
  gameTurn = '3';

  lobbyWebSocketAPI: LobbySocketAPI;

  configSnackBar: MatSnackBarConfig = {};

  constructor(private userService: UserService, private lobbyService: LobbyService, private exerciseService: ExerciseService,
              private gameService: GameService, private dialog: MatDialog,  private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: User) => {
      console.log(user);
      this.user = user;

      if (this.user.lobbyId) {
        this.lobbyService.getLobby(this.user.lobbyId).subscribe((lobby: Lobby) => {
          console.log(lobby);
          this.lobby = lobby;

          this.lobbyWebSocketAPI = new LobbySocketAPI(this, this.lobby.id);
          this.lobbyWebSocketAPI._connect();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.lobbyWebSocketAPI._disconnect();
  }

  leaveLobby(): void {
    if (this.lobby) {
      this.lobbyService.leaveLobby(this.lobby.id).subscribe((data) => {
        console.log(data);
        if (data.status === 204) {
          this.lobbyWebSocketAPI.sendLobbyUpdate();
          this.user.lobbyId = null;
          this.lobby = null;

          this.openSnackBar('Lobby left');
        }
      });
    }
  }

  createGame(): void {
    if (this.lobby) {
      if (this.lobby.users.length >= 2) {
        this.exerciseService.getRandomExercise().subscribe((exercise: Exercise) => {
          console.log(exercise);

          const usersInGame: UserInGame[] = Utilities.usersToUsersInGame(this.lobby.users);

          const timer: number = +this.gameTime;
          const turns: number = +this.gameTurn;

          this.gameService.createGame(new Game(exercise, usersInGame, null, false , '', timer, turns, [])).subscribe((game) => {
            this.openSnackBarGame('Game created !', game.id);
          });
        });
      } else {
        this.openSnackBar('You must have 2 players or more !');
      }
    }
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

            this.lobbyService.getLobby(data.lobbyId).subscribe((lobby: Lobby) => {
              console.log(lobby);
              this.lobby = lobby;

              this.lobbyWebSocketAPI = new LobbySocketAPI(this, lobby.id);
              this.lobbyWebSocketAPI._connect();
            });
          });
        }
      }
    );
  }

  keyCopied(): void {
    this.openSnackBar('Key copied to clipboard !');
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close');
  }

  openSnackBarGame(message: string, gameId: string): void {
    this.snackBar.openFromComponent(SnackBarGameComponent, {
      data: {message, gameId},
      ...this.configSnackBar
    });
  }

  refreshLobby(): void {
    if (this.lobby) {
      this.lobbyService.getLobby(this.lobby.id).subscribe((lobby: Lobby) => {
        console.log(lobby);
        if (lobby.users.find(user => user.id === this.user.id)) {
          this.lobby = lobby;
        } else {
          this.lobby = undefined;
        }
      });
    }
  }
}
