import { useEffect, useState } from "react";
import { useUsuarios } from "../../../hooks/useUsuarios";
import { showToast } from "../../../components/toast";
import { getErrorMessage } from "../../../utils/errorHandler";
import HeaderUsuarios from "./components/HeaderUsuarios";
import FiltersUsuarios from "./components/FiltersUsuarios";
import ContentUsuarios from "./components/ContentUsuarios";
import PaginationUsuarios from "./components/PaginationUsuarios";
import AddUsuarioModal from "./components/AddUsuarioModal";
import DeleteUsuarioModal from "./components/DeleteUsuarioModal";
import ImportUsuariosModal from "./components/ImportUsuariosModal";
import type {
     CreateUsuarioDTO,
     UpdateUsuarioDTO,
     ImportUsuarioDTO,
} from "../../../services/usuario.service";
import type { Usuario } from "../../../models/usuario.model";

function UsuarioList() {
     const {
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
     } = useUsuarios();

     const [isAddModalOpen, setIsAddModalOpen] = useState(false);
     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
     const [isImportModalOpen, setIsImportModalOpen] = useState(false);
     const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(
          null
     );
     const [isDeleting, setIsDeleting] = useState(false);

     useEffect(() => {
          const timer = setTimeout(() => {
               if (searchInput !== (filters.search || "")) {
                    setFilters({
                         ...filters,
                         search: searchInput || undefined,
                    });
                    setCurrentPage(0);
               }
          }, 1000);

          return () => clearTimeout(timer);
     }, [searchInput]);

     useEffect(() => {
          getUsuarios(currentPage, pageSize, filters);
     }, [currentPage, pageSize, filters, getUsuarios]);

     const handleStatusChange = (status: string) => {
          if (status === "") {
               const { status: _, ...rest } = filters;
               setFilters(rest);
          } else {
               setFilters({ ...filters, status });
          }
          setCurrentPage(0);
     };

     const handlePageChange = (page: number) => {
          setCurrentPage(page);
     };

     const handlePageSizeChange = (size: number) => {
          setPageSize(size);
          setCurrentPage(0);
     };

     const handleAddUsuario = async (data: CreateUsuarioDTO) => {
          try {
               await createUsuario(data);
               showToast.success("Usuário adicionado com sucesso!");
          } catch (error) {
               const errorMessage = getErrorMessage(
                    error,
                    "Erro ao adicionar usuário. Tente novamente."
               );
               showToast.error(errorMessage);
               throw error;
          }
     };

     const handleEditUsuario = (usuario: Usuario) => {
          setSelectedUsuario(usuario);
          setIsAddModalOpen(true);
     };

     const handleUpdateUsuario = async (data: UpdateUsuarioDTO) => {
          if (!selectedUsuario) return;

          try {
               await updateUsuario(selectedUsuario.id, data);
               showToast.success("Usuário atualizado com sucesso!");
               setSelectedUsuario(null);
          } catch (error) {
               const errorMessage = getErrorMessage(
                    error,
                    "Erro ao atualizar usuário. Tente novamente."
               );
               showToast.error(errorMessage);
               throw error;
          }
     };

     const handleDeleteClick = (usuario: Usuario) => {
          setSelectedUsuario(usuario);
          setIsDeleteModalOpen(true);
     };

     const handleDeleteUsuario = async () => {
          if (!selectedUsuario) return;

          setIsDeleting(true);
          try {
               await deleteUsuario(selectedUsuario.id);
               showToast.success("Usuário excluído com sucesso!");
               setSelectedUsuario(null);
          } catch (error) {
               const errorMessage = getErrorMessage(
                    error,
                    "Erro ao excluir usuário. Tente novamente."
               );
               showToast.error(errorMessage);
               throw error;
          } finally {
               setIsDeleting(false);
          }
     };

     const handleCloseModal = () => {
          setIsAddModalOpen(false);
          setSelectedUsuario(null);
     };

     const handleToggleStatus = async (id: number) => {
          try {
               await toggleUsuarioStatus(id);
               showToast.success("Status atualizado com sucesso!");
          } catch (error) {
               const errorMessage = getErrorMessage(
                    error,
                    "Erro ao atualizar status. Tente novamente."
               );
               showToast.error(errorMessage);
          }
     };

     const handleImportUsuarios = async (usuarios: ImportUsuarioDTO[]) => {
          try {
               await importUsuarios(usuarios);
               showToast.success(
                    `${usuarios.length} usuário(s) importado(s) com sucesso!`
               );
          } catch (error) {
               const errorMessage = getErrorMessage(
                    error,
                    "Erro ao importar usuários. Tente novamente."
               );
               showToast.error(errorMessage);
               throw error;
          }
     };

     return (
          <section className="w-full h-full flex flex-col">
               <HeaderUsuarios
                    onAddClick={() => setIsAddModalOpen(true)}
                    onImportClick={() => setIsImportModalOpen(true)}
               />

               <div className="bg-white">
                    <FiltersUsuarios
                         searchInput={searchInput}
                         setSearchInput={setSearchInput}
                         statusFilter={filters.status || ""}
                         onStatusChange={handleStatusChange}
                         onClearFilters={clearFilters}
                         hasActiveFilters={!!(filters.search || filters.status)}
                    />
               </div>

               <ContentUsuarios
                    loading={usuariosLoading}
                    error={error}
                    usuarios={usuarios}
                    onEdit={handleEditUsuario}
                    onDelete={handleDeleteClick}
                    onToggleStatus={handleToggleStatus}
               />

               {pageInfo &&
                    !usuariosLoading &&
                    !error &&
                    usuarios.length > 0 && (
                         <PaginationUsuarios
                              pageInfo={pageInfo}
                              currentPage={currentPage}
                              pageSize={pageSize}
                              onPageChange={handlePageChange}
                              onPageSizeChange={handlePageSizeChange}
                         />
                    )}

               <AddUsuarioModal
                    isOpen={isAddModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={
                         selectedUsuario
                              ? handleUpdateUsuario
                              : handleAddUsuario
                    }
                    usuario={selectedUsuario || undefined}
               />

               <DeleteUsuarioModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => {
                         setIsDeleteModalOpen(false);
                         setSelectedUsuario(null);
                    }}
                    onConfirm={handleDeleteUsuario}
                    usuarioNome={selectedUsuario?.nome || ""}
                    isDeleting={isDeleting}
               />

               <ImportUsuariosModal
                    isOpen={isImportModalOpen}
                    onClose={() => setIsImportModalOpen(false)}
                    onImport={handleImportUsuarios}
               />
          </section>
     );
}

export default UsuarioList;
