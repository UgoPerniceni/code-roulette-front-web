import { Component, OnInit } from '@angular/core';
import {Exercise} from '../../../model/Exercise';
import {ExerciseService} from '../../../service/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {}

}
