import { Usuario } from './usuario';

export interface LoginResponse extends Usuario {
  token: string;
}
