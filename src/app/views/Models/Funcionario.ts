import { FuncionarioTelefoneDTO } from "./FuncionarioTelefone";

export interface FuncionarioDTO {
  nome: string;
  sobrenome: string;
  email: string;
  cpf: string;
  dataNascimento: string; 
  cargoId: number;
  nomeGerente?: string;
  senha: string;
  telefones?: FuncionarioTelefoneDTO[];
}