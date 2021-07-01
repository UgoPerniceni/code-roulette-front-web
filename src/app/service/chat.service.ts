import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = environment.apiUrl + '/';

  constructor(private http: HttpClient) {}
}
