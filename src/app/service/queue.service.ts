import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Queue} from '../model/Queue';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  private url = environment.apiUrl + 'queue/';

  constructor(private http: HttpClient) {}

  getLobbies(): Observable<Queue[]>{
    return this.http.get<Queue[]>(this.url);
  }

  joinQueue(): Observable<User[]> {
    return this.http.post<any>(this.url + 'joinQueue', {});
  }

  leaveQueue(): Observable<HttpResponse<Queue>>{
    return this.http.delete<Queue>(this.url + 'leaveQueue', {observe: 'response'});
  }
}
