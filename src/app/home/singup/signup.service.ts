import { environment } from './../../../environments/environment';
import { Usuario } from './../../models/usuario.model';
import { Autheticacao } from './../../models/autenticacao.model';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewUser } from './new-user';
import { provideForRootGuard } from '@angular/router/src/router_module';
import { Observable } from "rxjs/Observable";

@Injectable()
export class SignUpService {

    urlUsuario: string = environment.apiOAuthUrl + '/api/usuario/cliente';
    urlCliente: string = environment.apiOAuthUrl + '/api/cliente';

    constructor(
        private http: Http) {
    }

    checkUserNameTaken(userName: string) {

        //return this.http.get(API_URL + '/user/exists/' + userName);
    }

    signup(newUser: NewUser): Observable<Usuario> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.urlUsuario, JSON.stringify({ "username": newUser.userName, "password": newUser.password, "authority": "ROLE_CLIENTE" }), { headers: headers })
            .map(res => res.json());
    }

    cadastrarCliente(authToken: string, id: string, newUser: NewUser): Observable<Autheticacao> {
        //console.log("AUTHTOKEN::: " + authToken);
        let headers = new Headers({
            'Accept': 'application/json',
            'X-Requested-By':'Angular 2',
          });
        
        let options = new RequestOptions({ headers: headers });
       // debugger;
        return this.http
            .post(this.urlCliente, JSON.stringify({"nome": newUser.fullName, "dataDeNascimento": "10/10/1990", "cpf": newUser.cpf }), options)
            .map(res => {
                //debugger;
                console.log("HEADER");
                console.log(res.json());
                return res.json();
            });


    }
}