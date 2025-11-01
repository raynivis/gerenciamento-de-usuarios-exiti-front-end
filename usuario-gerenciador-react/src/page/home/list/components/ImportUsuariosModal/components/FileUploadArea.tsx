import { FiUpload } from "react-icons/fi";

interface FileUploadAreaProps {
     fileInputRef: React.RefObject<HTMLInputElement | null>;
     onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FileUploadArea({ fileInputRef, onFileUpload }: FileUploadAreaProps) {
     return (
          <div className="text-center py-8">
               <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={onFileUpload}
                    className="hidden"
                    id="file-upload"
               />
               <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex flex-col items-center gap-3"
               >
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                         <FiUpload className="w-8 h-8 text-green-800" />
                    </div>
                    <div>
                         <p className="text-sm font-medium text-gray-700">
                              Clique para selecionar um arquivo Excel
                         </p>
                         <p className="text-xs text-gray-500 mt-1">
                              Formatos: .xlsx, .xls (Nome, E-mail, Status, Data
                              De Criação)
                         </p>
                    </div>
               </label>
          </div>
     );
}

export default FileUploadArea;
