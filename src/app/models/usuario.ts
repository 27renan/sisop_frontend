export interface Usuario {
  nome: string;
  email: string;
  role: string;
  createdAt: Date;
  unidade: {
    nome: string;
    sigla: string;
  };
}
