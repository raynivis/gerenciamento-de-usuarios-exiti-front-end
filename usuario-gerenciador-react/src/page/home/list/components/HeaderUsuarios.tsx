import { FaUserPlus } from "react-icons/fa6";

interface HeaderUsuariosProps {
     onAddClick: () => void;
}

function HeaderUsuarios({ onAddClick }: HeaderUsuariosProps) {
     return (
          <>
               <div className="p-4 bg-white">
                    <button
                         onClick={onAddClick}
                         className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                         <FaUserPlus className="w-4 h-4" /> ADICIONAR USUÁRIO
                    </button>
               </div>
          </>
     );
}

export default HeaderUsuarios;
