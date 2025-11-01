import axios from "axios";
import type { UsuarioResponse } from "../models/usuario.model";

const API_URL = "http://localhost:8080";

export interface UsuarioFilters {
     search?: string;
     status?: string;
}

export class UsuarioService {
     async getUsuarios(
          page: number = 0,
          size: number = 10,
          filters?: UsuarioFilters
     ): Promise<UsuarioResponse> {
          try {
               const params: any = { page, size };

               if (filters?.search) {
                    params.search = filters.search;
               }

               if (filters?.status) {
                    params.status = filters.status;
               }

               const response = await axios.get(`${API_URL}/usuarios`, {
                    params,
               });
               return response.data;
          } catch (error) {
               throw error;
          }
     }
}
