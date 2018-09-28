export class Avaliacao {
  public id: string;
  public codigoDaAvaliacao: string;
  public idCliente: string;
  public idCompra: string;
  public idProduto: string;
  public notaDeSatisfacao: number;
  public titulo: string;
  public descricao: string;
  public dataDaAvaliacao: string;
  public edicao: boolean = false;
}
