import { Funcionario } from "./Funcionario";
import { OrdemServico } from "./Os";
import { Servico } from "./Servico";

export interface ItensServico {
    id: number;
    horarioInicio: string;
    horarioFim: string;
    quantidade: number;
    precoTotal: number;
    funcionario: Funcionario;
    servico: Servico;
    numeroOs: OrdemServico;
  }
  