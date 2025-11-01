import { UsuariosProvider } from "../../hooks/useUsuarios";
import UsuarioList from "./list";

function Home() {
     return (
          <UsuariosProvider>
               <main className="w-full flex-1 overflow-auto px-60">
                    <div className="bg-white rounded-lg shadow-md h-full">
                         <UsuarioList />
                    </div>
               </main>
          </UsuariosProvider>
     );
}

export default Home;
