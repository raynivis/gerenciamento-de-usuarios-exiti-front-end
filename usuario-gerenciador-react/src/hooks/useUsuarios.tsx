import {
     useState,
     useCallback,
     useContext,
     createContext,
     type ReactNode,
} from "react";
import {
     UsuarioService,
     type UsuarioFilters,
     type CreateUsuarioDTO,
     type UpdateUsuarioDTO,
     type ImportUsuarioDTO,
} from "../services/usuario.service";
import type { Usuario, UsuarioResponse } from "../models/usuario.model";

interface UsuariosContextData {
     usuarios: Usuario[];
     usuariosLoading: boolean;
     error: string;
     pageInfo: UsuarioResponse | null;
     currentPage: number;
     pageSize: number;
     filters: UsuarioFilters;
     searchInput: string;
     getUsuarios: (
          page?: number,
          size?: number,
          filters?: UsuarioFilters
     ) => Promise<void>;
     createUsuario: (data: CreateUsuarioDTO) => Promise<void>;
     updateUsuario: (id: number, data: UpdateUsuarioDTO) => Promise<void>;
     deleteUsuario: (id: number) => Promise<void>;
     toggleUsuarioStatus: (id: number) => Promise<void>;
     importUsuarios: (usuarios: ImportUsuarioDTO[]) => Promise<void>;
     setCurrentPage: (page: number) => void;
     setPageSize: (size: number) => void;
     setFilters: (filters: UsuarioFilters) => void;
     setSearchInput: (search: string) => void;
     clearFilters: () => void;
}

const UsuariosContext = createContext<UsuariosContextData>(
     {} as UsuariosContextData
);

interface UsuariosProviderProps {
     children: ReactNode;
}

export const UsuariosProvider = ({ children }: UsuariosProviderProps) => {
     const [usuarios, setUsuarios] = useState<Usuario[]>([]);
     const [usuariosLoading, setUsuariosLoading] = useState(true);
     const [error, setError] = useState("");
     const [pageInfo, setPageInfo] = useState<UsuarioResponse | null>(null);
     const [currentPage, setCurrentPage] = useState(0);
     const [pageSize, setPageSize] = useState(10);
     const [filters, setFilters] = useState<UsuarioFilters>({});
     const [searchInput, setSearchInput] = useState("");

     const service = new UsuarioService();

     const getUsuarios = useCallback(
          async (
               page: number = 0,
               size: number = 10,
               filterParams: UsuarioFilters = {}
          ) => {
               try {
                    setUsuariosLoading(true);
                    setError("");
                    const response = await service.getUsuarios(
                         page,
                         size,
                         filterParams
                    );
                    setUsuarios(response.content);
                    setPageInfo(response);
                    setUsuariosLoading(false);
               } catch {
                    setError(
                         "Erro ao carregar os usuários. Verifique se o servidor está rodando."
                    );
                    setUsuariosLoading(false);
               }
          },
          []
     );

     const createUsuario = useCallback(
          async (data: CreateUsuarioDTO) => {
               await service.createUsuario(data);
               await getUsuarios(0, pageSize, filters);
               setCurrentPage(0);
          },
          [getUsuarios, pageSize, filters]
     );

     const updateUsuario = useCallback(
          async (id: number, data: UpdateUsuarioDTO) => {
               await service.updateUsuario(id, data);
               await getUsuarios(currentPage, pageSize, filters);
          },
          [getUsuarios, currentPage, pageSize, filters]
     );

     const deleteUsuario = useCallback(
          async (id: number) => {
               await service.deleteUsuario(id);
               await getUsuarios(0, pageSize, filters);
               setCurrentPage(0);
          },
          [getUsuarios, pageSize, filters]
     );

     const toggleUsuarioStatus = useCallback(
          async (id: number) => {
               await service.toggleUsuarioStatus(id);
               await getUsuarios(currentPage, pageSize, filters);
          },
          [getUsuarios, currentPage, pageSize, filters]
     );

     const importUsuarios = useCallback(
          async (usuarios: ImportUsuarioDTO[]) => {
               await service.importUsuarios(usuarios);
               await getUsuarios(0, pageSize, filters);
               setCurrentPage(0);
          },
          [getUsuarios, pageSize, filters]
     );

     const clearFilters = useCallback(() => {
          setFilters({});
          setSearchInput("");
          setCurrentPage(0);
     }, []);

     return (
          <UsuariosContext.Provider
               value={{
                    usuarios,
                    usuariosLoading,
                    error,
                    pageInfo,
                    currentPage,
                    pageSize,
                    filters,
                    searchInput,
                    getUsuarios,
                    createUsuario,
                    updateUsuario,
                    deleteUsuario,
                    toggleUsuarioStatus,
                    importUsuarios,
                    setCurrentPage,
                    setPageSize,
                    setFilters,
                    setSearchInput,
                    clearFilters,
               }}
          >
               {children}
          </UsuariosContext.Provider>
     );
};

export function useUsuarios() {
     const context = useContext(UsuariosContext);

     if (!context) {
          throw new Error(
               "useUsuarios deve ser usado em conjunto com UsuariosProvider"
          );
     }

     return context;
}
