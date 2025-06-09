import { Funcionario } from "./Funcionario";
import { OrdemServico } from "./Os";
import { Servico } from "./Servico";

export interface ItensServico {
    id: number;
    horarioInicio: string; // Usando string para representar horários no formato ISO ou 'HH:mm:ss'
    horarioFim: string;
    quantidade: number;
    precoTotal: number;
    funcionario: Funcionario; // Relacionamento com Funcionario
    servico: Servico; // Relacionamento com Servico
    numeroOs: OrdemServico; // Relacionamento com OrdemServico
  }
  