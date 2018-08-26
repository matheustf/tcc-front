import { environment } from './../../../environments/environment';
import { Autheticacao } from './../../models/autenticacao.model';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
  

  headers: Headers;

  url: string = environment.apiOAuthUrl + '/api/auth';

  constructor(
    private http: Http) {
      this.headers = new Headers();
      this.headers.append("Content-Type", 'application/json');

     }

  authenticate(userName: string, password: string): Observable<Autheticacao> {
    debugger;
      return this.http
      .post(this.url, JSON.stringify({ "username": userName, "password": password }), { headers: this.headers })
      .map(res => {
        debugger;
        console.log("AUTHENTICATE");
        console.log(res.json());
        return res.json();
    });
     ;
      
  }
}