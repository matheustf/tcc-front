import { Entrega } from './entrega.model';
import { Product } from './product.model';
export class Compra {
  public id: string;
  public codigoDoProduto: string;
  public codigoDaCompra: string;
  public idFornecedor: string;
  public quantidade: number;
  public valorDaCompra: number;

  public check: boolean = true;

  public entrega: Entrega;
  public produto: Product;
}
