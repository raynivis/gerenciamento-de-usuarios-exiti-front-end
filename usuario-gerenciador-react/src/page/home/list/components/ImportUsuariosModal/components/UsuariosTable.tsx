import type { ImportUsuarioDTO } from "../../../../../../services/usuario.service";

interface UsuarioComSelecao extends ImportUsuarioDTO {
     selected: boolean;
     error?: string;
}

interface UsuariosTableProps {
     usuarios: UsuarioComSelecao[];
     onToggleAll: () => void;
     onToggleUsuario: (index: number) => void;
}

function UsuariosTable({
     usuarios,
     onToggleAll,
     onToggleUsuario,
}: UsuariosTableProps) {
     return (
          <div className="max-h-96 overflow-y-auto">
               <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                         <tr>
                              <th className="px-3 py-2 text-left">
                                   <input
                                        type="checkbox"
                                        checked={usuarios.every(
                                             (u) => u.selected || u.error
                                        )}
                                        onChange={onToggleAll}
                                        className="rounded"
                                   />
                              </th>
                              <th className="px-3 py-2 text-left font-semibold text-gray-700">
                                   Nome
                              </th>
                              <th className="px-3 py-2 text-left font-semibold text-gray-700">
                                   Email
                              </th>
                              <th className="px-3 py-2 text-left font-semibold text-gray-700">
                                   Status
                              </th>
                              <th className="px-3 py-2 text-left font-semibold text-gray-700">
                                   Data De Criação
                              </th>
                         </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                         {usuarios.map((usuario, index) => (
                              <tr
                                   key={index}
                                   className={usuario.error ? "bg-red-50" : ""}
                              >
                                   <td className="px-3 py-2">
                                        <input
                                             type="checkbox"
                                             checked={usuario.selected}
                                             onChange={() =>
                                                  onToggleUsuario(index)
                                             }
                                             disabled={!!usuario.error}
                                             className="rounded"
                                        />
                                   </td>
                                   <td className="px-3 py-2">
                                        <div>
                                             <div
                                                  className={
                                                       usuario.error
                                                            ? "text-red-700"
                                                            : "text-gray-900"
                                                  }
                                             >
                                                  {usuario.nome || "-"}
                                             </div>
                                             {usuario.error && (
                                                  <div className="text-xs text-red-600 mt-1">
                                                       {usuario.error}
                                                  </div>
                                             )}
                                        </div>
                                   </td>
                                   <td
                                        className={`px-3 py-2 ${
                                             usuario.error
                                                  ? "text-red-700"
                                                  : "text-gray-600"
                                        }`}
                                   >
                                        {usuario.email || "-"}
                                   </td>
                                   <td
                                        className={`px-3 py-2 ${
                                             usuario.error
                                                  ? "text-red-700"
                                                  : "text-gray-600"
                                        }`}
                                   >
                                        {usuario.status || "-"}
                                   </td>
                                   <td
                                        className={`px-3 py-2 ${
                                             usuario.error
                                                  ? "text-red-700"
                                                  : "text-gray-600"
                                        }`}
                                   >
                                        {usuario.createdAt || "-"}
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </table>
          </div>
     );
}

export default UsuariosTable;
