import { NewCode } from './../model/NewCode';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Code } from '../model/Code';
import { environment } from '../../environments/environment';
import { Exercise } from '../model/Exercise';
import { Game } from '../model/Game';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  private url = environment.apiUrl + 'code/';

  constructor(private http: HttpClient) { }

  getCodes(): Observable<Code[]> {
    return this.http.get<Code[]>(this.url);
  }

  compile(exercise: Exercise): any {
    console.log('input' + exercise);

    return this.http.post<any>(this.url + 'compileAndSaveExercise', exercise);
  }

  compileNewCode(newCode: NewCode): any {
    console.log('input' + newCode);

    return this.http.post<any>(this.url + 'compileNewCode', newCode);
  }

  compileGame(game: Game, timer: number): any {
    console.log('input' + game);

    return this.http.post<any>(this.url + 'compileAndSave/' + timer, game);
  }
}
