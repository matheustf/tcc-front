import { Entrega } from './entrega.model';
import { Product } from './product.model';
import { Avaliacao } from './avaliacao.model';
export class Compra {
  public id: string;
  public codigoDoProduto: string;
  public codigoDaCompra: string;
  public idFornecedor: string;
  public quantidade: number;
  public valorDaCompra: number;
  public nomeDoProduto: string;
  public marca: string;
  public modelo: string;

  public check: boolean = true;

  public entrega: Entrega;
  public produto: Product;
  public avaliacao: Avaliacao;
}
