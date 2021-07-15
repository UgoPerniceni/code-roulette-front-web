import { Exercise } from './../../../model/Exercise';
import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/service/exercise.service';

@Component({
  selector: 'app-start-game-dialog',
  templateUrl: './start-game-dialog.component.html',
  styleUrls: ['./start-game-dialog.component.css']
})
export class StartGameDialogComponent implements OnInit {

  languages: string[] = ['All', 'Java', 'Python'];
  selection: any;
  exercise: Exercise | undefined;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.exerciseService.getRandomExercise().subscribe(exercise => {

      console.log('-----------------------');
      console.log(exercise);
      console.log('-----------------------');

      this.exercise = exercise;
    });
  }

  startGame(): void {

  }

}
