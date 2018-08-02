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

  url: string = "http://localhost:8080/pedidos";

  public constructor(http: Http) {
    super();
    this.http = http;

    this.headers = new Headers();
    this.headers.append("Content-Type", 'application/json');

  }


  criarPedido(pedido: Pedido): Observable<MensagemCadastro> {
    console.log("ENVIANDO");
    return this.http
      .post(this.url, JSON.stringify(pedido), { headers: this.headers })
      .map(() => new MensagemCadastro('Dados básicos alterados com sucesso', false));
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