import { useEffect } from "react";
import { useUsuarios } from "../../../hooks/useUsuarios";
import HeaderUsuarios from "./components/HeaderUsuarios";
import FiltersUsuarios from "./components/FiltersUsuarios";
import ContentUsuarios from "./components/ContentUsuarios";
import PaginationUsuarios from "./components/PaginationUsuarios";

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
          setCurrentPage,
          setPageSize,
          setFilters,
          setSearchInput,
          clearFilters,
     } = useUsuarios();

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

     return (
          <section className="w-full h-full flex flex-col">
               <HeaderUsuarios />

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
          </section>
     );
}

export default UsuarioList;
