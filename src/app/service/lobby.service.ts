import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {Lobby} from '../model/Lobby';
import {Exercise} from '../model/Exercise';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  private url = environment.apiUrl + 'lobby/';

  constructor(private http: HttpClient) {}

  getLobbies(): Observable<Lobby[]>{
    return this.http.get<Lobby[]>(this.url);
  }

  getLobby(id: string): Observable<Lobby>{
    return this.http.get<Lobby>(this.url + id);
  }

  createLobby(userId: string, lobbyTitle: string): Observable<User> {
    return this.http.post<User>(this.url + 'create/' + userId, lobbyTitle);
  }

  joinLobby(lobbyId: string): Observable<User> {
    return this.http.post<User>(this.url + 'joinLobby', lobbyId);
  }

  leaveLobby(lobbyId: string): Observable<HttpResponse<any>> {
    return this.http.post<string>(this.url + 'leaveLobby', lobbyId, {observe: 'response'});
  }
}
