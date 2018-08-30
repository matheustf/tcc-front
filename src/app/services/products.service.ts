import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Product } from "app/models/product.model";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { CachcingServiceBase } from "./caching.service";

let count = 0;

@Injectable()
export class ProductsDataService extends CachcingServiceBase {

  http: Http;
  headers: Headers;

  private products: Observable<Product[]>;

  url: string = environment.apiVendasUrl;

  public constructor(http: Http) {
    super();
    this.http = http;

    this.headers = new Headers();
    this.headers.append("Content-Type", 'application/json');

  }


  public all(): Observable<Product[]> {
    return this.cache<Product[]>(() => this.products,
      (val: Observable<Product[]>) => this.products = val,
      () => this.http
        .get(this.url + "/produtos")
        .map((response) => response.json()
          .map((item) => {
            console.log(item);
            let model = new Product();
            model.updateFrom(item);
            return model;
          })));

  }


  efetuarOPedido(idPedido: string): Observable<any> {
    console.log("ENVIANDO");
    return this.http
      .post(this.url + "/pedidos/" + idPedido + "/efetuarPedido", { headers: this.headers })
      .map((response) => response.json()
      );
  }

  find(codigoDoProduto: string): Observable<Product> {
    return this.http
      .get(this.url + "/produtos" + codigoDoProduto)
      .map((response) => response.json()
      );
  }

}
