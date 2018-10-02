import { Router } from '@angular/router';
import { User } from './../../core/user/user';
import { TokenService } from './../../core/token/token.service';
import { PedidoDataService } from './../../services/pedido.service';
import { Pedido } from './../../models/pedido.model';
import { Fornecedor } from './../../models/fornecedor.model';
import { Compra } from 'app/models/compra.model';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CartItem } from "app/models/cart-item.model";
import { DeliveryOption } from "app/models/delivery-option.model";
import { Product } from "app/models/product.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { DeliveryOptionsDataService } from "app/services/delivery-options.service";
import { ProductsDataService } from "app/services/products.service";
import { ShoppingCartService } from "app/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as jtw_decode from 'jwt-decode';
import { Endereco } from './../../models/endereco.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EnderecoService } from './../../services/endereco.service';
import { CepService } from '../../services/cep.service';
import { FornecedorService } from '../../services/fornecedor.service';

interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: "app-checkout",
  styleUrls: ["./checkout.component.scss"],
  templateUrl: "./checkout.component.html"
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public deliveryOptions: DeliveryOption[];
  public enderecoOptions: DeliveryOption[];
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;

  private products: Product[];
  private cartSubscription: Subscription;
  private endereco: Endereco;
  private novoEndereco: Endereco;
  private fornecedor: Fornecedor;

  edicaoEndereco: boolean = false;
  concluirEndereco: boolean = false;

  mensagem: string = '';


  public constructor(private productsService: ProductsDataService,
    private deliveryOptionService: DeliveryOptionsDataService,
    private shoppingCartService: ShoppingCartService,
    private pedidoService: PedidoDataService,
    private enderecoService: EnderecoService,
    private cepService: CepService,
    private fornecedorService: FornecedorService,
    private tokenService: TokenService,
    private router : Router) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
  }

  public setEnderecoOption(option: DeliveryOption): void {
    this.shoppingCartService.setEnderecoOption(option);
  }

  public ngOnInit(): void {
    this.deliveryOptions = [ 
    {"id":"1" , "nome":"Cartão de Credito"},
    {"id":"2" , "nome":"Paypal"},
    {"id":"3" , "nome":"Boleto"}
  ];

    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.all().subscribe((products) => {
        this.products = products;
        this.cartItems = cart.items
          .map((item) => {
            const product = this.products.find((p) => p.id === item.productId);
            return {
              ...item,
              product,
              totalCost: product.precoUnitario * item.quantity
            };
          });
      });
    });

    this.enderecoService.buscarEndereco()
    .subscribe(endereco => {
     this.endereco = endereco;
     this.endereco.pais = "Brasil";
    }, erro => console.log(erro));

  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  public enviarPedido() {
    console.log("OK");
    console.log(this.cartItems);
    console.log(this.cartItems[0].quantity);

    var pedido = new Pedido();
    console.log("CONSTRUIU");
    this.cartItems
      .map((item) => {

        var compra = new Compra();
        compra.codigoDoProduto = item.product.codigoDoProduto;
        compra.quantidade = item.quantity;
        compra.idFornecedor = item.product.codigoDoFornecedor;
        compra.nomeDoProduto = item.product.nome;
        compra.modelo = item.product.modelo;
        compra.marca = item.product.marca;

       // debugger;
      this.fornecedorService.buscarFornecedor(compra.idFornecedor)
      .subscribe(fornecedor => {
        this.fornecedor = fornecedor;
          console.log(fornecedor);
          compra.urlFornecedor=fornecedor.urlRetorno;
        //  debugger;
        }, erro => console.log(erro));

        pedido.compras.push(compra);
      });

    if (this.tokenService.hasToken()) {

      const token = this.tokenService.getToken();
      const user = jtw_decode(token) as User;

      pedido.idCliente = user.idCadastro;

      pedido.endereco = this.endereco;
      pedido.emailCliente = user.email;
      pedido.nomeDoCliente = user.username;

      //MUDAR FORMA DE PAGAMENTO
      pedido.formaDePagamento = "CREDITO";

      console.log("CONSTRUIU");
      console.log(pedido);

      this.pedidoService
        .criarPedido(pedido)
        .subscribe(pedidoCriado => {
          //debugger;

          this.productsService
          .efetuarOPedido(pedidoCriado.codigoDoPedido)
          .subscribe(res => {
            this.mensagem = res.mensagem;
            //debugger;
            this.router.navigate(['/confirmed']);
            
          }, erro => console.log(erro));



        }, erro => console.log(erro));
        
    } else {
      // MENSAGEM DE ERRO
      alert("Faça o login no sistema ou realize o cadastro!!!");
      this.router.navigate(['/home']);
    }
  }

  concluirPedido(concluirEndereco: boolean){
    this.concluirEndereco=concluirEndereco;
  }
  
  editarEndereco(endereco: Endereco) {
    this.novoEndereco=endereco;
    this.edicaoEndereco=true;
  }

  buscarCep(cep: string) {
    console.log("Buscando cep");
    console.log(cep);
    this.cepService.buscarCep(cep)
      .subscribe(novoEndereco => {
      this.novoEndereco = novoEndereco;
      novoEndereco.pais="Brasil";
        console.log("ACHOU O ENDERECO");
        console.log(novoEndereco);
      }, erro => console.log(erro));

  }

  save(novoEndereco: Endereco, isValid: boolean) {
    event.preventDefault();
    novoEndereco.pais="Brasil";

    console.log("SAVEE");
      this.enderecoService.inserirEndereco(this.novoEndereco)
      .subscribe(res => {
        this.mensagem = res.mensagem;
      }, erro => console.log(erro));

      this.endereco = novoEndereco;
      this.edicaoEndereco=false;
  }

}
