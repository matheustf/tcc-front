import { Compra } from './compra.model';

export class Pedido {
  public statusDoPedido: string;
  public codigoDoPedido: string;
  public idCliente: string;
  public dataDoPedido: string;
  public formaDePagamento: string;
  public valorDoPedido: string;
  

  public compras: Compra[] = new Array<Compra>();

  public updateFrom(src: Pedido) {
    this.statusDoPedido = src.statusDoPedido;
    this.codigoDoPedido = src.codigoDoPedido;
    this.idCliente = src.idCliente;
    this.dataDoPedido = src.dataDoPedido;
    this.formaDePagamento = src.formaDePagamento;
    this.valorDoPedido = src.valorDoPedido;
    this.compras = src.compras;
  }
}
