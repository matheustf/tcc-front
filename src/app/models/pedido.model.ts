import { Compra } from './compra.model';
import { Endereco } from './endereco.model';

export class Pedido {
  public statusDoPedido: string;
  public codigoDoPedido: string;
  public idCliente: string;
  public nomeDoCliente: string;
  public emailCliente: string;
  public dataDoPedido: string;
  public formaDePagamento: string;
  public valorDoPedido: string;
  
  public endereco: Endereco;
  public compras: Compra[] = new Array<Compra>();

  public updateFrom(src: Pedido) {
    this.statusDoPedido = src.statusDoPedido;
    this.codigoDoPedido = src.codigoDoPedido;
    this.idCliente = src.idCliente;
    this.nomeDoCliente = src.nomeDoCliente;
    this.emailCliente = src.emailCliente;
    this.dataDoPedido = src.dataDoPedido;
    this.formaDePagamento = src.formaDePagamento;
    this.valorDoPedido = src.valorDoPedido;
    this.endereco = this.endereco;
    this.compras = src.compras;
  }
}
