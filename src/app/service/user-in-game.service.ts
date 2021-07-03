import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInGame} from '../model/UserInGame';

@Injectable({
  providedIn: 'root'
})
export class UserInGameService {

  private url = environment.apiUrl + 'userInGame/';

  constructor(private http: HttpClient) {}

  getUsersInGame(): Observable<UserInGame[]>{
    return this.http.get<UserInGame[]>(this.url);
  }
}
