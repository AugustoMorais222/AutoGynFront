import { OrdemServico } from "./Os";
import { Peca } from "./Peca";

export interface ItensPeca {
    id: number;
    precoTotal: number;
    quantidade: number;
    numeroOs: OrdemServico; 
    peca: Peca;
  }
  