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

  url: string = environment.apiVendasUrl + '/produtos';

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
        .get(this.url)
        .map((response) => response.json()
          .map((item) => {
            console.log(item);
            let model = new Product();
            model.updateFrom(item);
            return model;
          })));

  }

  find(codigoDoProduto: string): Observable<Product> {
    return this.http
      .get(this.url + codigoDoProduto)
      .map((response) => response.json()
      );
  }

}
