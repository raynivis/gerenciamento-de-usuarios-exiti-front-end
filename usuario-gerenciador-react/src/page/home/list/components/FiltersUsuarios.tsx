import { FiSearch } from "react-icons/fi";

interface FiltersUsuariosProps {
     searchInput: string;
     setSearchInput: (value: string) => void;
     statusFilter: string;
     onStatusChange: (status: string) => void;
     onClearFilters: () => void;
     hasActiveFilters: boolean;
}

function FiltersUsuarios({
     searchInput,
     setSearchInput,
     statusFilter,
     onStatusChange,
     onClearFilters,
     hasActiveFilters,
}: FiltersUsuariosProps) {
     return (
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
               <div className="flex items-center gap-3">
                    <div className="relative flex-1 max-w-xs">
                         <FiSearch
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                              size={16}
                         />
                         <input
                              type="text"
                              placeholder="Buscar por nome..."
                              value={searchInput}
                              onChange={(e) => setSearchInput(e.target.value)}
                              className="w-full border border-gray-300 rounded pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                         />
                    </div>

                    <select
                         value={statusFilter}
                         onChange={(e) => onStatusChange(e.target.value)}
                         className="border border-gray-300 rounded px-3 py-1 text-sm bg-white focus:outline-none focus:border-primary"
                    >
                         <option value="">Todos</option>
                         <option value="Ativo">Ativo</option>
                         <option value="Inativo">Inativo</option>
                    </select>

                    {hasActiveFilters && (
                         <button
                              onClick={onClearFilters}
                              className="text-xs text-primary hover:text-secondary underline"
                         >
                              Limpar
                         </button>
                    )}
               </div>
          </div>
     );
}

export default FiltersUsuarios;
