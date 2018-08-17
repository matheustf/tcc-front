import { RequestInterceptor } from './../core/auth/request.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClienteService } from './singup/cliente.service';
import { AuthService } from './../core/auth/auth.service';
import { NgModule } from '@angular/core';
import { SignInComponent } from './signin/signin.component';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VMessageModule } from '../components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './singup/singup.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignUpService } from './singup/signup.service';

@NgModule({
    declarations: [ 
        SignInComponent,
        SignUpComponent,
        HomeComponent
    ],
    imports: [ 
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        VMessageModule,
        RouterModule,
        HomeRoutingModule
    ],
    providers: [
        SignUpService, AuthService, ClienteService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
          }
    ]
})
export class HomeModule { }