import type { UsuarioResponse } from "../../../../models/usuario.model";

interface PaginationUsuariosProps {
     pageInfo: UsuarioResponse;
     currentPage: number;
     pageSize: number;
     onPageChange: (page: number) => void;
     onPageSizeChange: (size: number) => void;
}

function PaginationUsuarios({
     pageInfo,
     currentPage,
     pageSize,
     onPageChange,
     onPageSizeChange,
}: PaginationUsuariosProps) {
     return (
          <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between">
               <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600">
                         Mostrando{" "}
                         <span className="font-semibold">
                              {pageInfo.numberOfElements}
                         </span>{" "}
                         de{" "}
                         <span className="font-semibold">
                              {pageInfo.totalElements}
                         </span>
                    </span>

                    <div className="flex items-center gap-2">
                         <label className="text-xs text-gray-600">Itens:</label>
                         <select
                              value={pageSize}
                              onChange={(e) =>
                                   onPageSizeChange(Number(e.target.value))
                              }
                              className="border border-gray-300 rounded px-2 py-0.5 text-xs bg-white focus:outline-none focus:border-primary"
                         >
                              <option value={10}>10</option>
                              <option value={20}>20</option>
                              <option value={30}>30</option>
                              <option value={40}>40</option>
                         </select>
                    </div>
               </div>

               <div className="flex items-center gap-1">
                    <button
                         onClick={() => onPageChange(0)}
                         disabled={pageInfo.first}
                         className="px-2 py-1 text-xs text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary"
                    >
                         ❮❮
                    </button>
                    <button
                         onClick={() => onPageChange(currentPage - 1)}
                         disabled={pageInfo.first}
                         className="px-2 py-1 text-xs text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary"
                    >
                         ❮
                    </button>

                    <span className="text-xs text-gray-600 px-3">
                         {pageInfo.number + 1} / {pageInfo.totalPages}
                    </span>

                    <button
                         onClick={() => onPageChange(currentPage + 1)}
                         disabled={pageInfo.last}
                         className="px-2 py-1 text-xs text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary"
                    >
                         ❯
                    </button>
                    <button
                         onClick={() => onPageChange(pageInfo.totalPages - 1)}
                         disabled={pageInfo.last}
                         className="px-2 py-1 text-xs text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary"
                    >
                         ❯❯
                    </button>
               </div>
          </div>
     );
}

export default PaginationUsuarios;
