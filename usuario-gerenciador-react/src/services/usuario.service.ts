import axios from "axios";
import type { UsuarioResponse } from "../models/usuario.model";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export interface UsuarioFilters {
     search?: string;
     status?: string;
}

export interface CreateUsuarioDTO {
     nome: string;
     email: string;
}

export interface UpdateUsuarioDTO {
     nome: string;
     email: string;
}

export interface ImportUsuarioDTO {
     nome: string;
     email: string;
     status?: string;
     createdAt?: string;
}

export interface ImportUsuarioResult {
     sucesso: ImportUsuarioDTO[];
     erros: { usuario: ImportUsuarioDTO; erro: string }[];
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

     async createUsuario(data: CreateUsuarioDTO): Promise<void> {
          try {
               await axios.post(`${API_URL}/usuarios`, data);
          } catch (error) {
               throw error;
          }
     }

     async updateUsuario(id: number, data: UpdateUsuarioDTO): Promise<void> {
          try {
               await axios.put(`${API_URL}/usuarios/${id}`, data);
          } catch (error) {
               throw error;
          }
     }

     async deleteUsuario(id: number): Promise<void> {
          try {
               await axios.delete(`${API_URL}/usuarios/${id}`);
          } catch (error) {
               throw error;
          }
     }

     async toggleUsuarioStatus(id: number): Promise<void> {
          try {
               await axios.patch(`${API_URL}/usuarios/${id}/status`);
          } catch (error) {
               throw error;
          }
     }

     async importUsuarios(
          usuarios: ImportUsuarioDTO[]
     ): Promise<ImportUsuarioResult> {
          try {
               const response = await axios.post(
                    `${API_URL}/usuarios/importacao`,
                    usuarios
               );
               return response.data;
          } catch (error) {
               throw error;
          }
     }
}
