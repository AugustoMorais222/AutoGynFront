import { Funcionario } from "./Funcionario";
import { OrdemServico } from "./OrdemServico";
import { Servico } from "./Servico";

export interface ItensServico {
    id?: number;
    horarioInicio: Date | null;
    horarioFim: Date | null;
    quantidade: number;
    precoTotal: number;
    funcionario: Funcionario | undefined;
    servico: Servico | undefined;
    numeroOs?: OrdemServico;
  }
  