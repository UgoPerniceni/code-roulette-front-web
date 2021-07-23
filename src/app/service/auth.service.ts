import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Session} from '../model/Session';
import {User} from '../model/User';
import {Login} from '../model/Login';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogin = true;

  private url = environment.apiUrl + 'auth/';

  private currentSessionSubject: BehaviorSubject<Session>;
  private readonly currentSessionObservable: Observable<Session>;

  constructor(private http: HttpClient) {
    this.currentSessionSubject = new BehaviorSubject<Session>(
      JSON.parse(localStorage.getItem('currentSession') || '{}')
    );
    this.currentSessionObservable = this.currentSessionSubject.asObservable();
  }

  signUp(user: User): Observable<HttpResponse<User>>{
    return this.http.post<User>(this.url + 'signup', user, {
      observe: 'response',
      headers: {'skip-interceptor': 'true'}
    });
  }

  login(login: Login): any {
    return this.http.post<any>(this.url + 'login', login, {
      observe: 'response',
      headers: {'skip-interceptor': 'true'}
    })
      .pipe(map((response => {
        if (response.headers.get('authorization')) {
          let token: string = response.headers.get('authorization') as string;
          token = token.substring(7);

          const session: Session = new Session(token);

          localStorage.setItem('currentSession', JSON.stringify(session));
          this.currentSessionSubject.next(session);

          console.log('Add new token : ' + token);
        }

        return response;
      })));
  }

  logout(): void{
    localStorage.removeItem('currentSession');
  }

  isConnected(): boolean {
    const LSSession = localStorage.getItem('currentSession');

    if (LSSession) {
      const session = JSON.parse(LSSession);
      if (session){
        return true;
      }
    }
    return false;
  }

  getSessionToken(): string {
    const LSSession = localStorage.getItem('currentSession');

    if (LSSession) {
      const session = JSON.parse(LSSession);
      if (session){
        return session.token;
      }
    }
    return '';
  }

  get currentSession(): Observable<any> {
    return this.currentSessionObservable;
  }
}
