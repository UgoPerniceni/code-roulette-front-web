import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../model/Exercise';
import { environment } from '../../environments/environment';
import { NewCode } from '../model/NewCode';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private url = environment.apiUrl + 'exercise/';

  constructor(private http: HttpClient) { }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.url);
  }

  getExercise(id: string): Observable<Exercise> {
    return this.http.get<Exercise>(this.url + id);
  }

  getRandomExercise(): Observable<Exercise> {
    return this.http.get<Exercise>(this.url + 'random');
  }

  saveNewExercise(newCode: NewCode): Observable<NewCode> {
    return this.http.post<NewCode>(this.url + 'save', newCode);
  }

}
