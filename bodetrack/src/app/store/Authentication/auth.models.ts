import { UsuarioLogin } from '../../Models/Acceso/Usuario.model';

// Interfaz para la respuesta completa de login de la API
export interface LoginResponse {
  code: number;
  success: boolean;
  message: string;
  data: UsuarioLogin;
}

// Exportar UsuarioLogin como User para mantener compatibilidad
export type User = UsuarioLogin;

