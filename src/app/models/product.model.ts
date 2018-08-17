import { Ingredient } from "app/models/ingredient.model";

export class Product {
  public id: string;
  public nome: string;
  public codigoDoProduto: string;
  public precoUnitario: number;
  public marca: string;
  public modelo: string;
  public urlImagem: string;

  public updateFrom(src: Product): void {
    this.id = src.id;
    this.nome = src.nome;
    this.codigoDoProduto = src.codigoDoProduto;
    this.precoUnitario = src.precoUnitario;
    this.marca = src.marca;
    this.modelo = src.modelo;
    this.urlImagem = src.urlImagem;
  }
}
