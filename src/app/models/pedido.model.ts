import { Compra } from './compra.model';

export class Pedido {
  public nomeDoComprador: string;
  public formaDePagamento: string;
  public compras: Compra[] = new Array<Compra>();

  public updateFrom(src: Pedido) {
    this.nomeDoComprador = src.nomeDoComprador;
    this.formaDePagamento = src.formaDePagamento;
    this.compras = src.compras;
    //this.valorTotal = src.valorTotal;
  }
}
