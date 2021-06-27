import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Exercise} from '../../model/Exercise';
import {ExerciseService} from '../../service/exercise.service';
import {MatSort} from '@angular/material/sort';
import {QueueService} from '../../service/queue.service';
import {Queue} from '../../model/Queue';
import {AuthService} from '../../service/auth.service';
import {User} from '../../model/User';
import {Lobby} from '../../model/Lobby';
import {UserService} from '../../service/user.service';
import {GameService} from '../../service/game.service';
import {Game} from '../../model/Game';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  isLookingForGame = false;

  constructor(private exerciseService: ExerciseService, private queueService: QueueService, private userService: UserService, private gameService: GameService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: User) => {
      console.log(user);
      if (user.queue){
        this.isLookingForGame = true;
      }
    });
  }

  onSlideChange(event: Event): void {
    this.isLookingForGame = !this.isLookingForGame;

    if (this.isLookingForGame) {
      this.queueService.joinQueue().subscribe((users: User[]) => {
        console.log(users);

        if (users.length > 0){
          console.log('Matched ' + users[0].userName + ' vs ' +  users[1].userName);

          this.createGame(users);
          this.isLookingForGame = false;

          alert('Matched ! Game created');

          // TODO Socket + Create game
        } else {
          alert('Enter in Queue');
        }
      });
    } else {
      this.queueService.leaveQueue().subscribe(data => {
        console.log(data);
      });
    }
  }

  createGame(users: User[]): void {
    this.exerciseService.getExercises().subscribe((exercices) => {
      console.log(exercices);
      const exercises = exercices;

      if (exercises.length > 0) {
        const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
        console.log(randomExercise);

        this.gameService.createGame(new Game(randomExercise, users)).subscribe((game) => {
          console.log(game);
        });
      }
    });
  }

}
