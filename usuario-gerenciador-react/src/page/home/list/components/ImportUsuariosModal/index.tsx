import { useState, useRef } from "react";
import { DefaultModal } from "../../../../../components/modal";
import * as XLSX from "xlsx";
import type { ImportUsuarioDTO } from "../../../../../services/usuario.service";
import FileUploadArea from "./components/FileUploadArea";
import FileHeader from "./components/FileHeader";
import UsuariosTable from "./components/UsuariosTable";

interface ImportUsuariosModalProps {
     isOpen: boolean;
     onClose: () => void;
     onImport: (usuarios: ImportUsuarioDTO[]) => Promise<void>;
}

interface UsuarioComSelecao extends ImportUsuarioDTO {
     selected: boolean;
     error?: string;
}

function ImportUsuariosModal({
     isOpen,
     onClose,
     onImport,
}: ImportUsuariosModalProps) {
     const [usuarios, setUsuarios] = useState<UsuarioComSelecao[]>([]);
     const [isImporting, setIsImporting] = useState(false);
     const [fileName, setFileName] = useState<string>("");
     const fileInputRef = useRef<HTMLInputElement>(null);

     const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;

          setFileName(file.name);

          const reader = new FileReader();
          reader.onload = (event) => {
               try {
                    const data = event.target?.result;
                    const workbook = XLSX.read(data, { type: "binary" });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json<{
                         Nome: string;
                         "E-mail": string;
                         Status?: string;
                         "Data De Criação"?: string | number;
                    }>(worksheet);

                    const usuariosParseados: UsuarioComSelecao[] = jsonData.map(
                         (row) => {
                              let createdAt: string | undefined;
                              if (row["Data De Criação"]) {
                                   const dateValue = row["Data De Criação"];
                                   if (typeof dateValue === "number") {
                                        const excelDate =
                                             XLSX.SSF.parse_date_code(
                                                  dateValue
                                             );
                                        createdAt = `${excelDate.y}-${String(
                                             excelDate.m
                                        ).padStart(2, "0")}-${String(
                                             excelDate.d
                                        ).padStart(2, "0")}`;
                                   } else {
                                        const dateStr =
                                             String(dateValue).trim();
                                        const parts = dateStr.split("/");
                                        if (
                                             parts.length === 3 &&
                                             parts[2].length === 4
                                        ) {
                                             createdAt = `${
                                                  parts[2]
                                             }-${parts[1].padStart(
                                                  2,
                                                  "0"
                                             )}-${parts[0].padStart(2, "0")}`;
                                        }
                                   }
                              }

                              const usuario: UsuarioComSelecao = {
                                   nome: row.Nome?.trim() || "",
                                   email: row["E-mail"]?.trim() || "",
                                   status: row.Status
                                        ? String(row.Status).trim()
                                        : undefined,
                                   createdAt,
                                   selected: true,
                              };

                              if (!usuario.nome) {
                                   usuario.error = "Nome é obrigatório";
                                   usuario.selected = false;
                              }

                              if (!usuario.email) {
                                   usuario.error = "Email é obrigatório";
                                   usuario.selected = false;
                              } else if (
                                   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                        usuario.email
                                   )
                              ) {
                                   usuario.error = "Email inválido";
                                   usuario.selected = false;
                              }

                              return usuario;
                         }
                    );

                    setUsuarios(usuariosParseados);
               } catch (error) {
                    alert("Erro ao ler arquivo Excel");
               }
          };
          reader.readAsBinaryString(file);
     };

     const handleToggleAll = () => {
          const allSelected = usuarios.every((u) => u.selected || u.error);
          setUsuarios(
               usuarios.map((u) =>
                    u.error ? u : { ...u, selected: !allSelected }
               )
          );
     };

     const handleToggleUsuario = (index: number) => {
          setUsuarios(
               usuarios.map((u, i) =>
                    i === index && !u.error
                         ? { ...u, selected: !u.selected }
                         : u
               )
          );
     };

     const handleImport = async () => {
          const usuariosParaImportar = usuarios
               .filter((u) => u.selected && !u.error)
               .map(({ nome, email, status, createdAt }) => ({
                    nome,
                    email,
                    ...(status && { status }),
                    ...(createdAt && { createdAt }),
               }));

          if (usuariosParaImportar.length === 0) {
               alert("Selecione pelo menos um usuário válido para importar");
               return;
          }

          setIsImporting(true);
          try {
               await onImport(usuariosParaImportar);
               handleClose();
          } catch {
          } finally {
               setIsImporting(false);
          }
     };

     const handleClose = () => {
          setUsuarios([]);
          setFileName("");
          if (fileInputRef.current) {
               fileInputRef.current.value = "";
          }
          onClose();
     };

     const handleRemoveFile = () => {
          setUsuarios([]);
          setFileName("");
          if (fileInputRef.current) {
               fileInputRef.current.value = "";
          }
     };

     const selectedCount = usuarios.filter((u) => u.selected).length;
     const errorCount = usuarios.filter((u) => u.error).length;

     return (
          <DefaultModal
               isOpen={isOpen}
               onRequestClose={handleClose}
               type="success"
               title="Importar Usuários"
               showFooter={false}
          >
               <div className="space-y-4">
                    {usuarios.length === 0 ? (
                         <FileUploadArea
                              fileInputRef={fileInputRef}
                              onFileUpload={handleFileUpload}
                         />
                    ) : (
                         <>
                              <FileHeader
                                   fileName={fileName}
                                   selectedCount={selectedCount}
                                   errorCount={errorCount}
                                   onRemoveFile={handleRemoveFile}
                              />

                              <UsuariosTable
                                   usuarios={usuarios}
                                   onToggleAll={handleToggleAll}
                                   onToggleUsuario={handleToggleUsuario}
                              />

                              <div className="flex justify-between gap-3 pt-4 border-t">
                                   <button
                                        type="button"
                                        onClick={handleClose}
                                        disabled={isImporting}
                                        className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                   >
                                        Cancelar
                                   </button>
                                   <button
                                        type="button"
                                        onClick={handleImport}
                                        disabled={
                                             isImporting || selectedCount === 0
                                        }
                                        className="px-6 py-2 text-white bg-primary hover:bg-green-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                   >
                                        {isImporting
                                             ? "Importando..."
                                             : `Importar ${selectedCount} usuário(s)`}
                                   </button>
                              </div>
                         </>
                    )}
               </div>
          </DefaultModal>
     );
}

export default ImportUsuariosModal;
