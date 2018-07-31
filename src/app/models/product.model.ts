import { Ingredient } from "app/models/ingredient.model";

export class Product {
  public id: string;
  public nome: string;
  public codigoDoProduto: string;
  public precoUnitario: number;

  public updateFrom(src: Product): void {
    this.id = src.id;
    this.nome = src.nome;
    this.codigoDoProduto = src.codigoDoProduto;
    this.precoUnitario = src.precoUnitario;

  }
}
