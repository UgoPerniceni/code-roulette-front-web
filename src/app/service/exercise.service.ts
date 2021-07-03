import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Exercise} from '../model/Exercise';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private url = environment.apiUrl + 'exercise/';

  constructor(private http: HttpClient) {}

  getExercises(): Observable<Exercise[]>{
    return this.http.get<Exercise[]>(this.url);
  }

  getExercise(id: string): Observable<Exercise>{
    return this.http.get<Exercise>(this.url + id);
  }

  getRandomExercise(): Observable<Exercise> {
    return this.http.get<Exercise>(this.url + 'random');
  }

}
