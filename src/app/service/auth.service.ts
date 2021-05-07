import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Session} from '../model/Session';
import {User} from '../model/User';
import {Login} from '../model/Login';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/api/auth/';

  private currentSessionSubject: BehaviorSubject<Session>;
  private readonly currentSessionObservable: Observable<Session>;

  constructor(private http: HttpClient) {
    this.currentSessionSubject = new BehaviorSubject<Session>(
      JSON.parse(localStorage.getItem('currentSession') || '{}')
    );
    this.currentSessionObservable = this.currentSessionSubject.asObservable();
  }


  login(login: Login): any {
    return this.http.post<any>(this.url + 'login', login, {observe: 'response'})
      .pipe(map((response => {
        if (response.headers.get('authorization')) {
          const token: string = response.headers.get('authorization') as string;
          const session: Session = new Session(token);

          localStorage.setItem('currentSession', JSON.stringify(session));
          this.currentSessionSubject.next(session);

          console.log('Add new token : ' + response.headers.get('authorization'));
        }

        return response;
      })));
  }

  logout(): void{
    localStorage.removeItem('currentSession');
  }

  signUp(user: User): Observable<HttpResponse<User>>{
    return this.http.post<User>(this.url + 'signup', user, {observe: 'response'});
  }

  checkIsConnected(): boolean {
    const LSSession = localStorage.getItem('currentSession');

    if (LSSession) {
      const session = JSON.parse(LSSession);
      if (session){
        // TODO + check with API
        return true;
      }
    }
    return false;
  }

  get currentSession(): Observable<any> {
    return this.currentSessionObservable;
  }


}
