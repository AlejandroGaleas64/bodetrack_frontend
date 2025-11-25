export interface Respuesta<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

export interface DataResponse {
  code_Status: number;
  message_Status: string;
}
