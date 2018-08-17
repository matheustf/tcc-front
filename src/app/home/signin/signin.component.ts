import { UserService } from './../../core/user/user.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    
    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef;
    
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.platformDetectorService.isPlatformBrowser() && 
        this.userNameInput.nativeElement.focus();        
    } 

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        console.log("LOGANDO: " + userName);
        this.authService
            .authenticate(userName, password)
            .subscribe(
                autenticacao => {
                     const authToken = autenticacao.token;
            this.userService.setToken(authToken);
        console.log(`User ${userName} authenticated with token ${authToken}`);
        //this.router.navigate(['user', userName]),
         this.router.navigate([''])
                },
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    this.platformDetectorService.isPlatformBrowser() && 
                        this.userNameInput.nativeElement.focus();
                    alert('Invalid user name or password');
                }
            );
    }
}