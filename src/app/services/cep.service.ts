import { environment } from './../../environments/environment';
import { Autheticacao } from './../models/autenticacao.model';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";
import { Endereco } from './../models/endereco.model';

@Injectable()
export class CepService {

  headers: Headers;

  url: string = environment.cepPostmon;

  constructor(
    private http: Http) {
    this.headers = new Headers();
    this.headers.append("Content-Type", 'application/json');

  }

  buscarCep(cep: string): Observable<Endereco> {
    return this.http
      .get(this.url + "/" + cep)
      .map(res => {
        //debugger;
        console.log(res.json());
        return res.json();
      });
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