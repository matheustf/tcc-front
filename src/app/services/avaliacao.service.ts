import { environment } from './../../environments/environment';
import { Avaliacao } from './../models/avaliacao.model';
import { Entrega } from './../models/entrega.model';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

let count = 0;

@Injectable()
export class AvaliacaoService {

  http: Http;
  headers: Headers;

  url: string = environment.apiAvaliacoesUrl + '/avaliacoes';

  public constructor(http: Http) {
    this.http = http;

    this.headers = new Headers();
    this.headers.append("Content-Type", 'application/json');

  }

  inserirAvaliacao(avaliacao: Avaliacao): Observable<Avaliacao> {
   // debugger;
      return this.http
      .post(this.url, JSON.stringify(avaliacao), { headers: this.headers })
      .map(res => res.json());
     
  }
    
}