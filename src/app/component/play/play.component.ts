import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExerciseService} from '../../service/exercise.service';
import {User} from '../../model/User';
import {UserService} from '../../service/user.service';
import {GameService} from '../../service/game.service';
import {Game} from '../../model/Game';
import {ChatSocketAPI} from '../../socket/chatSocketAPI';
import {PlaySocketAPI} from '../../socket/playSocketAPI';
import {UserInGame} from '../../model/UserInGame';
import {Utilities} from '../../utils/Utilities';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {SnackBarGameComponent} from '../snack-bar-game/snack-bar-game.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy {

  webSocketAPI: PlaySocketAPI;

  isLookingForGame = false;
  usersInQueue = 0;
  currentUserId: string;

  configSnackBar: MatSnackBarConfig = {};

  constructor(private router: Router, private exerciseService: ExerciseService, private userService: UserService, private gameService: GameService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: User) => {
      console.log(user);
      this.currentUserId = user.id;

      if (user.inQueue){
        this.isLookingForGame = true;
      }
    });

    this.userService.countUsersInQueue().subscribe((numberOfUsersInQueue: number) => {
      this.usersInQueue = numberOfUsersInQueue;

      this.webSocketAPI = new PlaySocketAPI(this);
      this.webSocketAPI._connect();
    });
  }

  ngOnDestroy(): void {
    if (this.isLookingForGame) {
      this.userService.leaveQueue().subscribe((data) => {
        this.webSocketAPI.sendQueueUpdate();
        this.webSocketAPI._disconnect();
      });
    }
  }

  onSlideChange(event: Event): void {
    this.changeQueueStatus();
  }

  changeQueueStatus(): void{
    this.isLookingForGame = !this.isLookingForGame;

    if (this.isLookingForGame) {
      this.userService.joinQueue().subscribe((users: User[]) => {
        console.log(users);

        this.webSocketAPI.sendQueueUpdate();

        if (users.length > 0){
          console.log('Matched ' + users[0].userName + ' vs ' +  users[1].userName);

          const usersInGame: UserInGame[] = Utilities.usersToUsersInGame(users);

          this.exerciseService.getRandomExercise().subscribe((exercise) => {
            console.log(exercise);

            this.gameService.createGame(new Game(exercise, usersInGame, null, false,  '', 25, 3, [])).subscribe((game) => {
              console.log(game);

              this.isLookingForGame = false;

              this.webSocketAPI.sendQueueUpdate();
              this.webSocketAPI.sendGameCreated(game.id);
            });
          });
        } else {
          this.openSnackBar('Enter in Queue');
        }
      });
    } else {
      this.userService.leaveQueue().subscribe(data => {
        this.webSocketAPI.sendQueueUpdate();
        this.openSnackBar('Left queue');
      });
    }
  }

  refreshQueueCounter(): void {
    let usersInQueue = 0;

    this.userService.getUsers().subscribe((users) => {
      users.forEach((user) => {
        if (user.inQueue) {
          usersInQueue++;
        }

        if (user.id === this.currentUserId) {
          if (this.isLookingForGame !== user.inQueue) {
            this.isLookingForGame = user.inQueue;
          }
        }
      });

      this.usersInQueue = usersInQueue;
    });
  }

  checkGameCreated(gameId: string): void {
    console.log(gameId);
    this.gameService.getGameDtoById(gameId).subscribe((game) => {
      console.log(game);
      game.usersInGame.forEach(usersIg => {
        if (usersIg.user.id === this.currentUserId) {
          this.redirectToGameCreated(game.id);
        }
      });
    });
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

  redirectToGameCreated(gameId: string): void {
    const path = '/play/game/' + gameId;
    this.router.navigateByUrl(path).then();
  }

}
