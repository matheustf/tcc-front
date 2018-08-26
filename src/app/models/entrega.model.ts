import { HistoricoDeEntrega } from './historico-de-entrega.model';

export class Entrega {
  public codigoDaEntrega: string;
  public idCliente: string;
  public idFornecedor: string;
  public idCompra: string;
  public codigoDeRastreio: string;
  public estimativaDeEntrega: string;
  public statusDaEntrega: string;

  public historicoDeEntrega: HistoricoDeEntrega[] = new Array<HistoricoDeEntrega>();

}
