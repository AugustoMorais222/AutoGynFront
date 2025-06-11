export interface Funcionario {
  id?: number;
  nome?: string;
  cpf?: string;
  salario?: number;
  dataNascimento?: Date | null;
  dataAdmissao?: Date | null;
  dataDemissao?: Date | null;  
  cargo?: string;
  endereco?: string;
  telefone?: string;
}
