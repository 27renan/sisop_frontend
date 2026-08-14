export interface DetailsUser {
  id: string;
  nome: string;
  email: string;
  role: string;
  createdAt: Date;
  unidade: {
    nome: string;
    sigla: string;
  };
}
