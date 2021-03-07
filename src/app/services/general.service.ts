import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Quote} from '../models/Quote';
import {HttpClient} from '@angular/common/http';
import {QUOTES_API} from '../utils/constants';
import {Email} from "../models/Email";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  getRandomQuote(): Observable<Quote> {
    return this.http.get<Quote>(QUOTES_API);
  }

  sendEmail(email: Email): Observable<Email> {
    return this.http.post<Email>(environment.email_url, email);
  }
}
