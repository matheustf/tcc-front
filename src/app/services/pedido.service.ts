import { environment } from './../../environments/environment';
import { Pedido } from './../models/pedido.model';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { CachcingServiceBase } from "./caching.service";

let count = 0;

@Injectable()
export class PedidoDataService extends CachcingServiceBase {

  http: Http;
  headers: Headers;

  url: string = environment.apiVendasUrl + '/pedidos/';

  public constructor(http: Http) {
    super();
    this.http = http;

    this.headers = new Headers();
    this.headers.append("Content-Type", 'application/json');

  }

  buscarPedidosCliente(idCliente: string): Observable<any> {
    console.log("ENVIANDO");
      return this.http
            .get(this.url + 'cliente' +  '/' + idCliente)
            .map(res => res.json());
  }

  criarPedido(pedido: Pedido): Observable<Pedido> {
    console.log("ENVIANDO");
    return this.http
      .post(this.url, JSON.stringify(pedido), { headers: this.headers })
      .map(res => res.json());
  }

  efetuarPedido(idPedido: string): Observable<MensagemCadastro> {
    console.log("ENVIANDO");
    return this.http
      .post(this.url + idPedido + "/efetuarPedido", { headers: this.headers })
      .map(() => new MensagemCadastro('sucesso', false));
  }

}

export class MensagemCadastro {

  constructor(private _mensagem: string, private _inclusao: boolean) {
    this._mensagem = _mensagem;
    this._inclusao = _inclusao;
  }

  get mensagem(): string {
    return this._mensagem;
  }

  get inclusao(): boolean {
    return this._inclusao;
  }

}