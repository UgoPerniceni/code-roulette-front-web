import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Code} from '../model/Code';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  private url = 'http://localhost:8080/api/code/';

  constructor(private http: HttpClient) { }

  getCodes(): Observable<Code[]>{
    return this.http.get<Code[]>(this.url);
  }

  compile(input: string): any{
    return this.http.post<any>(this.url + 'compile', input);
  }
}
