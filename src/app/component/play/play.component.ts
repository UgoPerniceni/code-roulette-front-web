import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExerciseService} from '../../service/exercise.service';
import {User} from '../../model/User';
import {UserService} from '../../service/user.service';
import {GameService} from '../../service/game.service';
import {Game} from '../../model/Game';
import {GameSocketAPI} from '../../socket/gameSocketAPI';
import {PlaySocketAPI} from '../../socket/playSocketAPI';
import {UserInGame} from '../../model/UserInGame';
import {Utilities} from '../../utils/Utilities';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy {

  webSocketAPI: PlaySocketAPI;

  isLookingForGame = false;
  usersInQueue = 0;

  constructor(private exerciseService: ExerciseService, private userService: UserService, private gameService: GameService) {}

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
          alert('Matched ! Game created');

        } else {
          alert('Enter in Queue');
        }
      });
    } else {
      this.userService.leaveQueue().subscribe(data => {
        this.webSocketAPI.sendQueueUpdate();
        console.log(data);
      });
    }
  }

  createGame(usersInGame: UserInGame[]): void {
    this.exerciseService.getRandomExercise().subscribe((exercice) => {
      console.log(exercice);

      this.gameService.createGame(new Game(exercice, usersInGame, null, false)).subscribe((game) => {
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

}
