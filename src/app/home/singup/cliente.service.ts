import { environment } from './../../../environments/environment';
import { Usuario } from './../../models/usuario.model';
import { Autheticacao } from './../../models/autenticacao.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewUser } from './new-user';
import { provideForRootGuard } from '@angular/router/src/router_module';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ClienteService {

    url: string = environment.apiOAuthUrl + '/api/cliente';

    constructor(private http: HttpClient) { }

    checkUserNameTaken(userName: string) {

        //return this.http.get(API_URL + '/user/exists/' + userName);
    }

    cadastrarCliente(authToken: string, id: string, newUser: NewUser) {
        //debugger;
        return this.http.post(this.url, {"nome": newUser.fullName, "dataDeNascimento": "10/10/1990", "cpf": newUser.cpf });
    }
}