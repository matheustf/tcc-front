import { Router } from '@angular/router';
import { User } from './../../core/user/user';
import { TokenService } from './../../core/token/token.service';
import { PedidoDataService } from './../../services/pedido.service';
import { Pedido } from './../../models/pedido.model';
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
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;

  private products: Product[];
  private cartSubscription: Subscription;

  mensagem: string = '';


  public constructor(private productsService: ProductsDataService,
    private deliveryOptionService: DeliveryOptionsDataService,
    private shoppingCartService: ShoppingCartService,
    private pedidoService: PedidoDataService,
    private tokenService: TokenService,
    private router : Router) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
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

        pedido.compras.push(compra);
      });

    if (this.tokenService.hasToken()) {

      const token = this.tokenService.getToken();
      const user = jtw_decode(token) as User;

      pedido.idCliente = user.idCadastro;


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
}
