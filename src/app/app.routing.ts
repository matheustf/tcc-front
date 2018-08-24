import { AuthGuard } from './core/auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './home/singup/singup.component';
import { SignInComponent } from './home/signin/signin.component';
import { HomeRoutingModule } from './home/home.routing.module';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CheckoutComponent } from "./components/checkout/checkout.component";
import { OrderConfirmationComponent } from "./components/order-confirmation/order-confirmation.component";
import { StoreFrontComponent } from "./components/store-front/store-front.component";
import { PopulatedCartRouteGuard } from "./route-gaurds/populated-cart.route-gaurd";
import { HomeModule } from "./home/home.module";
import { MeusPedidosComponent } from './home/meuspedidos/meuspedidos.component';

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot([
            /*{
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            },
            {
                    path: 'home',
                    loadChildren: './home/home.module#HomeModule'
            },*/
                    { 
                        canActivate: [AuthGuard],
                        path: 'home',
                        component: SignInComponent,
                    }, 
                    { 
                        canActivate: [AuthGuard],
                        path: 'signup',
                        component: SignUpComponent,
                    },     
                    { 
                        canActivate: [AuthGuard],
                        path: 'meuspedidos',
                        component: MeusPedidosComponent,
                    },         
            {
                canActivate: [PopulatedCartRouteGuard],
                component: CheckoutComponent,
                path: "checkout"
            },
            {
                canActivate: [PopulatedCartRouteGuard],
                component: OrderConfirmationComponent,
                path: "confirmed"
            },
            {
                component: StoreFrontComponent,
                path: "**"
            }])
    ]
})
export class AppRoutingModule { }
