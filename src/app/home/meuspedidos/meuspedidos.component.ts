import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';

@Component({
    templateUrl: './meuspedidos.component.html',
    styleUrls: ['./meuspedidos.component.css']
})
export class MeusPedidosComponent implements OnInit {
    lUsers: any[] = [1,2,3,4,5];

    constructor() { }

    

    ngOnInit(): void {
    }

    
   
}

