import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './singup/singup.component';
import { MeusPedidosComponent } from './meuspedidos/meuspedidos.component';

const routes: Routes = [
    { 
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { 
                path: '',
                component: SignInComponent,
            }, 
            { 
                path: 'signup',
                component: SignUpComponent,
            },   
            { 
                path: 'meuspedidos',
                component: MeusPedidosComponent,
            },          
        ]
    },              
];

@NgModule({
    imports: [ 
        RouterModule.forChild(routes) 
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule { }

