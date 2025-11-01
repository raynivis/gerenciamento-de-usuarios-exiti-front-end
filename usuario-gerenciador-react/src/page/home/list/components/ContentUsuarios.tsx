import { FaUserMinus, FaUserPen } from "react-icons/fa6";
import Switch from "react-switch";

import type { Usuario } from "../../../../models/usuario.model";

interface ContentUsuariosProps {
     loading: boolean;
     error: string;
     usuarios: Usuario[];
     onEdit: (usuario: Usuario) => void;
     onDelete: (usuario: Usuario) => void;
     onToggleStatus: (id: number) => void;
}

function ContentUsuarios({
     loading,
     error,
     usuarios,
     onEdit,
     onDelete,
     onToggleStatus,
}: ContentUsuariosProps) {
     if (loading) {
          return (
               <div className="flex justify-center items-center flex-1 bg-white">
                    <div className="text-center py-12">
                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-3"></div>
                         <p className="text-gray-500 text-sm">
                              Carregando usuários...
                         </p>
                    </div>
               </div>
          );
     }

     if (error) {
          return (
               <div className="flex justify-center items-center flex-1 bg-white p-8">
                    <div className="text-center">
                         <p className="text-red-600 text-sm">{error}</p>
                    </div>
               </div>
          );
     }

     if (usuarios.length === 0) {
          return (
               <div className="flex justify-center items-center flex-1 bg-white p-8">
                    <div className="text-center">
                         <p className="text-gray-500 text-sm">
                              Nenhum usuário encontrado.
                         </p>
                    </div>
               </div>
          );
     }

     return (
          <div className="flex-1 overflow-auto bg-white">
               <table className="min-w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                         <tr>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                                   Status
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                                   Nome
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                                   E-mail
                              </th>

                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                                   Criado em
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                                   Atualizado em
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                                   Ações
                              </th>
                         </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                         {usuarios.map((usuario) => (
                              <tr
                                   key={usuario.id}
                                   className="hover:bg-gray-50 transition-colors"
                              >
                                   <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                             <Switch
                                                  checked={
                                                       usuario.status ===
                                                       "Ativo"
                                                  }
                                                  onChange={() =>
                                                       onToggleStatus(
                                                            usuario.id
                                                       )
                                                  }
                                                  onColor="#368467"
                                                  offColor="#ef4444"
                                                  handleDiameter={16}
                                                  uncheckedIcon={false}
                                                  checkedIcon={false}
                                                  height={20}
                                                  width={40}
                                             />
                                             <span className="text-xs text-gray-600">
                                                  {usuario.status}
                                             </span>
                                        </div>
                                   </td>
                                   <td className="px-4 py-3 text-sm text-gray-900">
                                        {usuario.nome}
                                   </td>
                                   <td className="px-4 py-3 text-sm text-gray-600">
                                        {usuario.email}
                                   </td>

                                   <td className="px-4 py-3 text-sm text-gray-600">
                                        {new Date(
                                             usuario.createdAt
                                        ).toLocaleDateString("pt-BR")}
                                   </td>
                                   <td className="px-4 py-3 text-sm text-gray-600">
                                        {new Date(
                                             usuario.updatedAt
                                        ).toLocaleDateString("pt-BR")}
                                   </td>
                                   <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                             <button
                                                  onClick={() =>
                                                       onEdit(usuario)
                                                  }
                                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                  title="Editar usuário"
                                             >
                                                  <FaUserPen className="w-5 h-5" />
                                             </button>
                                             <button
                                                  onClick={() =>
                                                       onDelete(usuario)
                                                  }
                                                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                  title="Excluir usuário"
                                             >
                                                  <FaUserMinus className="w-5 h-5" />
                                             </button>
                                        </div>
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </table>
          </div>
     );
}

export default ContentUsuarios;
