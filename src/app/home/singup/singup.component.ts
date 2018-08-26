import { ClienteService } from './cliente.service';
import { UserService } from './../../core/user/user.service';
import { AuthService } from './../../core/auth/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from '../../components/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [UserNotTakenValidatorService]
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private authService: AuthService,
        private userService: UserService,
        private clienteService: ClienteService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService) { }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            cpf: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            dataNascimento: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['',
                [
                    Validators.required,
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                //  this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(14)
                ]
            ]
        });

        this.platformDetectorService.isPlatformBrowser() &&
            this.emailInput.nativeElement.focus();
    }

    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser;
        var idUser = "";
        var authToken = "";
        console.log("CADASTRO USUARIO");

        this.signUpService
            .signup(newUser)
            .subscribe(
                usuario => {
                    idUser = usuario.id;
                    console.log("cadastrou " + idUser);
                    console.log("cadastrou " + usuario);
                }, err => console.log(err)
            );

        setTimeout(() => {
            console.log("AUTH");
            debugger;
            this.authService
                .authenticate(newUser.userName, newUser.password)
                .subscribe(
                    autenticacao => {
                        console.log(`User ${newUser.userName} authenticated with token ${authToken}`);
                        authToken = autenticacao.token;
                        debugger;
                        this.userService.setToken(authToken);
                    },
                    err => {
                        console.log(err);
                    }
                )
        }, 1500)

        setTimeout(() => {
            debugger;
            console.log("CADASTRO");
            console.log("TOKEN " + authToken);
            this.clienteService
                .cadastrarCliente(authToken, idUser, newUser)
                .subscribe(
                    () => {
                        this.router.navigate([''])
                        this.authService
                        .authenticate(newUser.userName, newUser.password)
                        .subscribe(
                            autenticacao => {
                                console.log(`User ${newUser.userName} authenticated with token ${authToken}`);
                                authToken = autenticacao.token;
                                debugger;
                                this.userService.setToken(authToken);
                            },
                            err => {
                                console.log(err);
                            }
                        )

                },
                    err => console.log(err)
                );
        }, 2500);


        

    }
}