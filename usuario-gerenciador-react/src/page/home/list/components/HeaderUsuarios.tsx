import { FaUserPlus } from "react-icons/fa6";
import { RiFolderAddFill } from "react-icons/ri";

interface HeaderUsuariosProps {
     onAddClick: () => void;
     onImportClick: () => void;
}

function HeaderUsuarios({ onAddClick, onImportClick }: HeaderUsuariosProps) {
     return (
          <div className="flex gap-1">
               <div className="p-4 px-1 bg-white">
                    <button
                         onClick={onAddClick}
                         className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                         <FaUserPlus className="w-4 h-4" /> ADICIONAR USUÁRIO
                    </button>
               </div>
               <div className="p-4 px-1 bg-white">
                    <button
                         onClick={onImportClick}
                         className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                         <RiFolderAddFill className="w-4 h-4" /> IMPORTAR
                         USUÁRIOS
                    </button>
               </div>
          </div>
     );
}

export default HeaderUsuarios;
