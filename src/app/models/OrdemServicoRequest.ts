import { ItemPecaRequest } from "./ItemPecaRequest";
import { ItemServicoRequest } from "./ItemServicoRequest";

export interface OrdemServicoRequest {
  status: string;
  placaVeiculo: string;
  idCliente: number;
  itensPeca: ItemPecaRequest[];
  itensServico: ItemServicoRequest[];
}