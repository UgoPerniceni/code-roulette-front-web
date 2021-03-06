import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game, GameDto} from '../model/Game';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private url = environment.apiUrl + 'game/';

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(this.url);
  }

  getGameById(id: string): Observable<Game>{
    return this.http.get<Game>(this.url + id);
  }

  getGameDtoById(id: string): Observable<GameDto>{
    return this.http.get<Game>(this.url + 'light/' + id);
  }

  getGamesByUserId(userId: string): Observable<Game[]>{
    return this.http.get<Game[]>(this.url + 'games/' +  userId);
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.url + 'create/', game);
  }

  endTurn(game: Game): Observable<Game> {
    return this.http.post<Game>(this.url + 'endTurn/', game);
  }

  forfeit(game: Game): Observable<Game> {
    return this.http.post<Game>(this.url + 'forfeit/', game);
  }
}
