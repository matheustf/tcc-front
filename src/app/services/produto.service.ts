import { environment } from './../../environments/environment';
import { Product } from 'app/models/product.model';
import { Entrega } from './../models/entrega.model';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

let count = 0;

@Injectable()
export class ProdutoService {

  http: Http;
  headers: Headers;

  url: string = environment.apiVendasUrl + '/produtos/codigoDoProduto/';

  public constructor(http: Http) {
    this.http = http;

    this.headers = new Headers();
    this.headers.append("Content-Type", 'application/json');

  }

   buscarProdutos(codigoDoProduto: string) : Observable<Product>{
        return this.http.get(this.url + codigoDoProduto)
        .map(res => res.json());;
    }
    
}