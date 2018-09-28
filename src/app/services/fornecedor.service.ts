import { environment } from './../../environments/environment';
import { Fornecedor } from './../models/fornecedor.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { provideForRootGuard } from '@angular/router/src/router_module';
import { Observable } from "rxjs/Observable";

@Injectable()
export class FornecedorService {

    url: string = environment.apiOAuthUrl + '/api/fornecedor';

    constructor(private http: HttpClient) { }

    checkUserNameTaken(userName: string) {

        //return this.http.get(API_URL + '/user/exists/' + userName);
    }

    buscarFornecedor(codigoDoFornecedor: string) : Observable<Fornecedor> {
        //debugger;
        return this.http.get<Fornecedor>(this.url + "/" + codigoDoFornecedor);
    }

}