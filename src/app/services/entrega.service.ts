import { environment } from './../../environments/environment';
import { Entrega } from './../models/entrega.model';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

let count = 0;

@Injectable()
export class EntregaService {

  http: Http;
  headers: Headers;

  url: string = environment.apiEntregasUrl + '/entregas/codigoDaCompra/';

  public constructor(http: Http) {
    this.http = http;

    this.headers = new Headers();
    this.headers.append("Content-Type", 'application/json');

  }

   buscarEntrega(idCompra: string) : Observable<Entrega>{
        return this.http.get(this.url + idCompra)
        .map(res => res.json());;
    }
}