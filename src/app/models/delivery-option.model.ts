export class DeliveryOption {
  public id: string;
  public nome: string;
  public codigoDoProduto: string;
  public precoUnitario: number;

  public updateFrom(src: DeliveryOption): void {
    this.id = src.id;
    this.nome = src.nome;
    this.codigoDoProduto = src.codigoDoProduto;
    this.precoUnitario = src.precoUnitario;
  }
}
