import { OrdemServico } from "./Os";
import { Peca } from "./Peca";

export interface ItensPeca {
    id: number;
    precoTotal: number;
    quantidade: number;
    numeroOs: OrdemServico; // Relacionamento com OrdemServico
    peca: Peca; // Relacionamento com Pecas
  }
  