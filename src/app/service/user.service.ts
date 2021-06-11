import { Injectable } from '@angular/core';
import {User} from '../model/User';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl + 'users/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

  deleteUser(id: string): Observable<HttpResponse<User>>{
    return this.http.delete<User>(this.url + id, {observe: 'response'});
  }

}
