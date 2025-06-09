export interface Funcionario {
  id: number;
  nome: string;
  salario: number;
  dataNascimento: string;  // Definir como string para compatibilidade com JSON
  dataAdmissao: string;    // Definir como string para compatibilidade com JSON
  dataDemissao: string;    // Definir como string para compatibilidade com JSON
  cargo: string;
  endereco: string;
  telefone: string;
}
