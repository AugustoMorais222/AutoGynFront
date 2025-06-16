import { OrdemServico } from "./OrdemServico";
import { Peca } from "./Peca";

export interface ItensPeca {
    id: number;
    precoTotal: number;
    quantidade: number;
    numeroOs: OrdemServico; 
    peca: Peca;
  }
  