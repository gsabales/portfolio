import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Quote} from '../models/Quote';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  getRandomQuote(): Observable<Quote[]> {
    return this.http.get<Quote[]>('https://type.fit/api/quotes');
  }
}
