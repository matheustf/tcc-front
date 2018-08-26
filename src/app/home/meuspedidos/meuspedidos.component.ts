import { AvaliacaoService } from './../../services/avaliacao.service';
import { Avaliacao } from './../../models/avaliacao.model';
import { Compra } from 'app/models/compra.model';
import { ProdutoService } from './../../services/produto.service';
import { Product } from './../../../../e2e/models/product.model';
import { EntregaService } from './../../services/entrega.service';
import { Pedido } from './../../models/pedido.model';
import { User } from './../../core/user/user';
import { TokenService } from './../../core/token/token.service';
import { PedidoDataService } from './../../services/pedido.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';
import * as jtw_decode from 'jwt-decode';
import { Entrega } from '../../models/entrega.model';

@Component({
    templateUrl: './meuspedidos.component.html',
    styleUrls: ['./meuspedidos.component.css']
})
export class MeusPedidosComponent implements OnInit {
    lUsers: any[] = [1, 2, 3, 4, 5];

    pedidos: Pedido[] = new Array<Pedido>();

    public constructor(private pedidoDataService: PedidoDataService,
        private entregaService: EntregaService,
        private produtoService: ProdutoService,
        private avaliacaoService: AvaliacaoService,
        private tokenService: TokenService) {
    }

    setOpen(compra: Compra) {
        if (compra.check == true) {
            compra.check = false;
        } else {
            compra.check = true;
        }
    }

    avaliar(titulo: string, descricao: string, box: string, pedido: Pedido, compra : Compra){
        console.log(descricao);
        console.log("teste "+ box);
        let nota = box.split(" ");
        console.log(nota[1]);

        let avaliacao = new Avaliacao();
        avaliacao.idCliente = pedido.idCliente;
        avaliacao.idProduto = compra.produto.codigoDoProduto;
        avaliacao.notaDeSatisfacao = +nota[1];
        avaliacao.titulo = titulo;
        avaliacao.descricao = descricao;

        console.log("AVALIACAO");
        console.log(avaliacao);

        this.avaliacaoService.inserirAvaliacao(avaliacao)
        .subscribe(avaliacao => {
            console.log("AVALIACAO ENVIADA");
        });

    }

    ngOnInit(): void {
        const token = this.tokenService.getToken();
        const user = jtw_decode(token) as User;
        let idCliente = user.idCadastro;
        console.log("AAAA")
        this.pedidoDataService.buscarPedidosCliente(idCliente)
            .subscribe(pedidos => {
                this.pedidos = pedidos;
                console.log("pedidos");
                console.log(pedidos);
                console.log("End");

                this.pedidos.forEach(pedido => {
                    pedido.compras.forEach(compra => {
                        this.entregaService.buscarEntrega(compra.codigoDaCompra)
                            .subscribe(entrega => {
                                compra.entrega = new Entrega();
                                compra.entrega.codigoDeRastreio = entrega.codigoDeRastreio;
                                compra.entrega.estimativaDeEntrega = entrega.estimativaDeEntrega;
                                compra.entrega.idCliente = entrega.idCliente;
                                compra.entrega.idCompra = entrega.idCompra;
                                compra.entrega.idFornecedor = entrega.idFornecedor;
                                compra.entrega.statusDaEntrega = entrega.statusDaEntrega;
                                compra.entrega.historicoDeEntrega = entrega.historicoDeEntrega;
                               
                                let e = entrega.codigoDaEntrega.split("-");
                                let c = compra.codigoDaCompra.split("-");
                               
                                compra.entrega.codigoDaEntrega = e[1] + ":" + c[1];

                                console.log("PEDIDOS E COMPRAS");
                                console.log(pedidos);
                            });

                        this.produtoService.buscarProdutos(compra.codigoDoProduto)
                            .subscribe(produto => {
                                compra.produto = produto;
                                console.log("PEDIDOS E COMPRAS");
                                console.log(pedidos);

                            });

                    });
                });




            }, erro => console.log(erro));
    }

}

