import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl + 'user/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  countUsersInQueue(): Observable<number> {
    return this.http.get<number>(this.url + 'usersInQueue/');
  }

  getCurrentUser(): Observable<User> {
    const token = this.authService.getSessionToken();
    return this.http.get<User>(this.url + 'token/' + token);
  }

  deleteUser(id: string): Observable<HttpResponse<User>> {
    return this.http.delete<User>(this.url + id, { observe: 'response' });
  }

  joinQueue(): Observable<User[]> {
    return this.http.post<any>(this.url + 'joinQueue', {});
  }

  leaveQueue(): Observable<HttpResponse<HttpResponse<User>>> {
    return this.http.delete<HttpResponse<User>>(this.url + 'leaveQueue', { observe: 'response' });
  }
  updateUser(user: User): Observable<User> {
    return this.http.post<any>(this.url + 'updateUser/', user, {});
  }
}
