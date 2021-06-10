import { Component, OnInit } from '@angular/core';
import {Exercise} from '../../../model/Exercise';
import {ExerciseService} from '../../../service/exercise.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  exercise: Exercise | undefined;

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.getExercise();
  }

  getExercise(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.exerciseService.getExercise(id).subscribe(exercise => {
      this.exercise = exercise;
    });
  }

}
