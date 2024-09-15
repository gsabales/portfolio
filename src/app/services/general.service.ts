import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Quote} from '../models/Quote';
import {HttpClient} from '@angular/common/http';
import {QUOTES_API} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  getRandomQuote(): Observable<Quote> {
    return this.http.get<Quote>(QUOTES_API);
  }
}
