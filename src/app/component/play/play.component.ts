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
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy {

  webSocketAPI: PlaySocketAPI;

  isLookingForGame = false;
  usersInQueue = 0;

  constructor(private exerciseService: ExerciseService, private userService: UserService, private gameService: GameService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: User) => {
      console.log(user);
      if (user.isInQueue){
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
    this.webSocketAPI._disconnect();
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

          this.createGame(usersInGame);

          this.isLookingForGame = false;
          this.openSnackBar('Matched ! Game created');

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

  createGame(usersInGame: UserInGame[]): void {
    this.exerciseService.getRandomExercise().subscribe((exercice) => {
      console.log(exercice);

      this.gameService.createGame(new Game(exercice, usersInGame, null, false,  '', 25, [])).subscribe((game) => {
        console.log(game);
        this.webSocketAPI.sendQueueUpdate();
      });
    });
  }

  refreshQueueCounter(): void {
    this.userService.countUsersInQueue().subscribe((numberOfUsersInQueue: number) => {
      this.usersInQueue = numberOfUsersInQueue;
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close');
  }

}
