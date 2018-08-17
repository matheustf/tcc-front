import { PlatformDetectorService } from './plataform-detector/platform-detector.service';
import { AuthService } from './auth/auth.service';
import { TokenService } from './token/token.service';
import { UserService } from './user/user.service';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from './auth/request.interceptor';

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule
    ],
    providers: [
        UserService,
        TokenService,
        AuthService,
        AuthGuard,
        HttpClient,
        PlatformDetectorService
    ]
})
export class CoreModule { }