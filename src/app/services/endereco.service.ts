import { environment } from './../../environments/environment';
import { Autheticacao } from './../models/autenticacao.model';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";
import { Endereco } from './../models/endereco.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EnderecoService {

  headers: Headers;

  url: string = environment.apiOAuthUrl + '/api/cliente';

  constructor(private http: HttpClient) { }

  inserirEndereco(endereco: Endereco): Observable<MensagemCadastro> {
    //debugger
    return this.http
      .post(this.url + '/endereco', JSON.stringify(endereco))
      .map(() => new MensagemCadastro('Endereco alterado com sucesso', false));
  }

  buscarEndereco() :  Observable<Endereco>{
    return this.http.get<Endereco>(this.url + '/endereco');
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