import type { Usuario } from "../../../../models/usuario.model";

interface ContentUsuariosProps {
     loading: boolean;
     error: string;
     usuarios: Usuario[];
}

function ContentUsuarios({ loading, error, usuarios }: ContentUsuariosProps) {
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
                                   Nome
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                                   E-mail
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                                   Situação
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                                   Criado em
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                                   Atualizado em
                              </th>
                         </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                         {usuarios.map((usuario) => (
                              <tr
                                   key={usuario.id}
                                   className="hover:bg-gray-50 transition-colors"
                              >
                                   <td className="px-4 py-3 text-sm text-gray-900">
                                        {usuario.nome}
                                   </td>
                                   <td className="px-4 py-3 text-sm text-gray-600">
                                        {usuario.email}
                                   </td>
                                   <td className="px-4 py-3">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium">
                                             {usuario.status.toUpperCase()}
                                        </span>
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
                              </tr>
                         ))}
                    </tbody>
               </table>
          </div>
     );
}

export default ContentUsuarios;
