import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Code} from '../model/Code';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  private url = environment.apiUrl + 'code/';

  constructor(private http: HttpClient) { }

  getCodes(): Observable<Code[]>{
    return this.http.get<Code[]>(this.url);
  }

  compile(input: string): any{
    return this.http.post<any>(this.url + 'compile', input);
  }
}
